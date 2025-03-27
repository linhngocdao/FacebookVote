/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CopyOutlined,
  DeleteOutlined,
  FilterOutlined,
  PhoneOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  Button,
  Card,
  Col,
  Input,
  Layout,
  message,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  theme,
  Tooltip,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { AddPhone, DeletePhone, GetPhones } from '../../config/PhoneNumber';
import { useDebounce } from '../../hooks/useDebounce';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

interface Phone {
  _id: string;
  phoneNumber: string;
  isDuplicate: boolean;
  count: number;
  createdAt: string;
  updatedAt: string;
}

interface FiltersState {
  query: string;
  isDuplicate: boolean | undefined;
  current: number;
  pageSize: number;
}

const highlightText = (text: string, highlight: string) => {
  if (!highlight || !text) return text;

  // Escape special regex characters in the search term
  const escapedHighlight = highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={i} style={{ backgroundColor: '#ffc069', padding: '0 2px' }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </>
  );
};

const PhoneNumberManager: React.FC = () => {
  const { token } = theme.useToken();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<FiltersState>({
    query: '',
    isDuplicate: undefined,
    current: 1,
    pageSize: 10
  });

  const [activeTab, setActiveTab] = useState('all');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isImportPanelOpen, setIsImportPanelOpen] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const isDuplicate = activeTab === 'duplicate'
      ? true
      : (activeTab === 'unique' ? false : undefined);

    setFilters(prevFilters => ({
      ...prevFilters,
      isDuplicate,
      current: 1
    }));

    setSelectedRowKeys([]);
  }, [activeTab]);

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      query: debouncedSearch,
      current: 1
    }));

    setSelectedRowKeys([]);
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery<any>({
    queryKey: ['phones', filters],
    queryFn: () => GetPhones({
      page: filters.current,
      limit: filters.pageSize,
      isDuplicate: filters.isDuplicate,
      query: filters.query || undefined
    })
  });

  // Add phone mutation
  const { mutate: addPhones, isPending: isAddingPhone } = useMutation({
    mutationFn: (phoneNumbers: number[]) => AddPhone({ phoneNumbers }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phones'] });
      setPhoneInput('');
      message.success('Số điện thoại đã được thêm thành công!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => message.error(item));
          }
        });
      } else {
        message.error(`Lỗi: ${error.message || 'Không thể thêm số điện thoại'}`);
      }
    }
  });

  const { mutate: deletePhones, isPending: isDeleting } = useMutation({
    mutationFn: async (ids: string | string[]) => {
      const phoneIds = Array.isArray(ids) ? ids : [ids];
      await Promise.all(phoneIds.map((id) => DeletePhone(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phones'] });
      setSelectedRowKeys([]);
      message.success('Đã xóa số điện thoại thành công!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => message.error(item));
          }
        });
      } else {
        message.error('Đã có lỗi xảy ra khi xóa số điện thoại!');
      }
    },
  });

  // Hàm xác nhận xóa chung cho cả xóa đơn lẻ và nhiều
  const showDeleteConfirm = (ids: string | string[]) => {
    const isMultiple = Array.isArray(ids) && ids.length > 1;
    const title = isMultiple
      ? `Bạn có chắc chắn muốn xóa ${ids.length} số điện thoại đã chọn không?`
      : 'Bạn có chắc chắn muốn xóa số điện thoại này không?';

    if (isMultiple && ids.length === 0) {
      message.warning('Vui lòng chọn ít nhất một số điện thoại để xóa');
      return;
    }

    Modal.confirm({
      title,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okButtonProps: { danger: true, style: { borderRadius: '6px' } },
      cancelButtonProps: { style: { borderRadius: '6px' } },
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      onOk() {
        deletePhones(ids);
      }
    });
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // Handle page change
  const handlePageChange = (page: number, pageSize?: number) => {
    setFilters(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize
    }));

    setSelectedRowKeys([]);
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhoneInput(e.target.value);
  };

  const handleAddPhone = () => {
    const phones = phoneInput
      .split(/[\n,\s]+/)
      .map(p => p.trim())
      .filter(p => p && !isNaN(Number(p)))
      .map(Number);

    if (phones.length > 0) {
      addPhones(phones);
    } else {
      message.error('Vui lòng nhập số điện thoại hợp lệ');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCopy = (phoneList: Phone[]) => {
    const phoneNumbers = phoneList.map(phone => phone.phoneNumber).join('\n');
    navigator.clipboard.writeText(phoneNumbers).then(
      () => {
        message.success('Đã sao chép danh sách số điện thoại!');
      },
      (err) => {
        message.error(`Không thể sao chép: ${err}`);
      }
    );
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE
    ],
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => (filters.current - 1) * filters.pageSize + index + 1,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text: string) => highlightText(text, debouncedSearch)
    },
    {
      title: 'Số lần xuất hiện',
      dataIndex: 'count',
      key: 'count',
      align: 'center' as const,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDuplicate',
      key: 'isDuplicate',
      align: 'center' as const,
      render: (isDuplicate: boolean) => (
        isDuplicate ?
          <Tag color="error" style={{ borderRadius: '12px', padding: '2px 10px' }}>Trùng</Tag> :
          <Tag color="success" style={{ borderRadius: '12px', padding: '2px 10px' }}>Không trùng</Tag>
      ),
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center' as const,
      render: (updatedAt: string) => new Date(updatedAt).toLocaleString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center' as const,
      render: (record: Phone) => (
        <Tooltip title="Xóa số điện thoại này">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              showDeleteConfirm(record._id);
            }}
            loading={isDeleting}
            type="text"
            shape="circle"
          />
        </Tooltip>
      ),
    }
  ];

  const tabItems = [
    {
      key: 'all',
      label: (
        <Space>
          <PhoneOutlined />
          <span>Tất cả số</span>
          {data && <Badge count={data.data.pagination.totalDocs} style={{ backgroundColor: token.colorPrimary }} />}
        </Space>
      )
    },
    {
      key: 'duplicate',
      label: (
        <Space>
          <FilterOutlined />
          <span>Danh sách trùng</span>
          {data && data.data.duplicateCount > 0 &&
            <Badge count={data.data.duplicateCount} style={{ backgroundColor: token.colorError }} />
          }
        </Space>
      )
    },
    {
      key: 'unique',
      label: (
        <Space>
          <PhoneOutlined />
          <span>Danh sách không trùng</span>
          {data && data.data.uniqueCount > 0 &&
            <Badge count={data.data.uniqueCount} style={{ backgroundColor: token.colorSuccess }} />
          }
        </Space>
      )
    }
  ];

  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    marginBottom: 24
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header style={{
        background: 'linear-gradient(135deg, #1890ff 0%, #6e32c9 100%)',
        padding: '0 24px',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ margin: '16px 0', color: 'white' }}>
              <PhoneOutlined /> Hệ Thống Lọc Số Điện Thoại Trùng
            </Title>
          </Col>
          <Col>
            <Text style={{ color: 'white' }}>
              Contact: @ling30th5 để được support | <a href="http://subsieutoc.net" target='_blank' style={{ color: 'white', textDecoration: 'underline' }}>Mua like, sub, follow các nền tảng</a>
            </Text>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '24px 50px' }}>
        <Card
          style={{ ...cardStyle, display: isImportPanelOpen ? 'block' : 'none' }}
          title={
            <Space>
              <UploadOutlined />
              <span>Nhập số điện thoại</span>
            </Space>
          }
          extra={
            <Button
              type="text"
              onClick={() => setIsImportPanelOpen(false)}
              shape="circle"
            >
              ✕
            </Button>
          }
        >
          <Row gutter={16}>
            <Col span={24}>
              <TextArea
                rows={4}
                value={phoneInput}
                onChange={handlePhoneInputChange}
                placeholder="Nhập danh sách số điện thoại (phân cách bằng dấu phẩy, xuống dòng hoặc khoảng trắng)"
                style={{ marginBottom: 16, borderRadius: '8px' }}
              />
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={handleAddPhone}
                loading={isAddingPhone}
                style={{ borderRadius: '8px' }}
                size="large"
              >
                Lọc số
              </Button>
            </Col>
          </Row>
        </Card>

        {!isImportPanelOpen && (
          <Button
            type="primary"
            onClick={() => setIsImportPanelOpen(true)}
            style={{ marginBottom: 16, borderRadius: '8px' }}
            icon={<UploadOutlined />}
          >
            Nhập số điện thoại
          </Button>
        )}

        <Card style={cardStyle}>
          <Row gutter={16}>
            <Col span={24}>
              <Input
                placeholder="Tìm kiếm số điện thoại"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: 300, borderRadius: '8px' }}
                prefix={<SearchOutlined />}
                allowClear
                size="large"
              />
            </Col>
          </Row>
        </Card>

        <Card
          style={cardStyle}
          bodyStyle={{ padding: 0 }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={tabItems}
            size="large"
            tabBarStyle={{
              padding: '0 16px',
              marginBottom: 0,
              borderBottom: '1px solid #f0f0f0'
            }}
            tabBarExtraContent={
              <Space>
                {selectedRowKeys.length > 0 && (
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteConfirm(selectedRowKeys as string[])}
                    loading={isDeleting}
                    style={{ borderRadius: '8px' }}
                  >
                    Xóa ({selectedRowKeys.length})
                  </Button>
                )}
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(data?.data.phones || [])}
                  disabled={!data || data.data.phones.length === 0}
                  style={{ borderRadius: '8px' }}
                >
                  Sao chép danh sách
                </Button>
              </Space>
            }
          />
          <div style={{ padding: '16px' }}>
            <Spin spinning={isLoading}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data?.data.phones}
                rowKey="_id"
                pagination={false}
                locale={{ emptyText: 'Không có dữ liệu' }}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              />
              {data && data?.data.pagination.totalPages > 0 && (
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <Pagination
                    current={filters.current}
                    total={data?.data.pagination.totalDocs}
                    pageSize={filters.pageSize}
                    onChange={handlePageChange}
                    showSizeChanger
                    showTotal={(total) => `Tổng cộng ${total} bản ghi`}
                  />
                </div>
              )}
            </Spin>
          </div>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'white' }}>
        Hệ thống lọc số điện thoại trùng © {new Date().getFullYear()} - Phát triển bởi @ling30th5
      </Footer>
    </Layout>
  );
};

export default PhoneNumberManager;
