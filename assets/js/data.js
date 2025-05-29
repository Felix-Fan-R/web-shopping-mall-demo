// 用户数据
const users = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        email: 'admin@example.com',
        avatar: 'user1'
    },
    {
        id: 2,
        username: 'user1',
        password: '123456',
        email: 'user1@example.com',
        avatar: 'user2'
    }
];

// 产品数据
const products = [
    {
        id: 1,
        name: '智能手机 Pro Max',
        price: 2999,
        originalPrice: 3999,
        description: '最新款智能手机，搭载高性能处理器，6.7英寸超视网膜显示屏，支持5G网络。',
        category: '电子产品',
        brand: 'Apple',
        stock: 100,
        sales: 500,
        rating: 4.8,
        reviews: 120,
        images: ['product1'],
        specifications: {
            '屏幕': '6.7英寸 OLED',
            '处理器': 'A15 仿生芯片',
            '内存': '8GB',
            '存储': '256GB',
            '电池': '4500mAh',
            '摄像头': '4800万像素三摄'
        },
        features: [
            '超长续航',
            '快速充电',
            '防水防尘',
            '面部识别'
        ]
    },
    {
        id: 2,
        name: '时尚外套',
        price: 599,
        originalPrice: 799,
        description: '秋冬新款时尚外套，采用优质面料，保暖舒适，多色可选。',
        category: '服装',
        brand: 'Fashion',
        stock: 200,
        sales: 300,
        rating: 4.5,
        reviews: 80,
        images: ['product2'],
        specifications: {
            '材质': '羊毛混纺',
            '尺码': 'S/M/L/XL',
            '颜色': '黑色/灰色/蓝色',
            '季节': '秋冬',
            '风格': '休闲商务'
        },
        features: [
            '保暖',
            '防风',
            '透气',
            '易打理'
        ]
    },
    {
        id: 3,
        name: '智能手表',
        price: 1299,
        originalPrice: 1499,
        description: '多功能智能手表，支持健康监测、运动追踪、消息提醒等功能。',
        category: '电子产品',
        brand: 'Smart',
        stock: 150,
        sales: 400,
        rating: 4.7,
        reviews: 150,
        images: ['product3'],
        specifications: {
            '屏幕': '1.4英寸 AMOLED',
            '电池': '300mAh',
            '防水等级': 'IP68',
            '运动模式': '12种',
            '健康监测': '心率/血氧/睡眠'
        },
        features: [
            '全天候健康监测',
            '运动追踪',
            '消息提醒',
            '防水防尘'
        ]
    },
    {
        id: 4,
        name: '智能音箱',
        price: 399,
        originalPrice: 499,
        description: 'AI智能音箱，支持语音控制，智能家居联动，高品质音效。',
        category: '电子产品',
        brand: 'Smart',
        stock: 300,
        sales: 600,
        rating: 4.6,
        reviews: 200,
        images: ['product4'],
        specifications: {
            '扬声器': '2.1声道',
            '功率': '20W',
            '连接方式': 'WiFi/蓝牙',
            '语音助手': '支持',
            '智能家居': '支持'
        },
        features: [
            '语音控制',
            '智能家居',
            '高品质音效',
            '多设备联动'
        ]
    }
];

// 购物车数据
const cartItems = [
    {
        id: 1,
        productId: 1,
        quantity: 1,
        selected: true
    },
    {
        id: 2,
        productId: 3,
        quantity: 2,
        selected: true
    }
];

// 订单数据
const orders = [
    {
        id: 1,
        userId: 1,
        items: [
            {
                productId: 1,
                quantity: 1,
                price: 2999
            },
            {
                productId: 3,
                quantity: 1,
                price: 1299
            }
        ],
        totalAmount: 4298,
        status: '已完成',
        createTime: '2024-01-01 10:00:00',
        payTime: '2024-01-01 10:05:00',
        shipTime: '2024-01-02 09:00:00',
        completeTime: '2024-01-05 15:00:00'
    }
];

// 分类数据
const categories = [
    {
        id: 1,
        name: '电子产品',
        icon: 'fas fa-mobile-alt',
        subCategories: ['手机', '电脑', '配件']
    },
    {
        id: 2,
        name: '服装',
        icon: 'fas fa-tshirt',
        subCategories: ['上衣', '裤子', '鞋帽']
    },
    {
        id: 3,
        name: '家居',
        icon: 'fas fa-home',
        subCategories: ['家具', '家纺', '厨具']
    },
    {
        id: 4,
        name: '食品',
        icon: 'fas fa-utensils',
        subCategories: ['零食', '饮料', '生鲜']
    }
];

// 轮播图数据
const slides = [
    {
        id: 1,
        image: 'slide1',
        title: '新品上市',
        description: '限时特惠，新品8折起'
    },
    {
        id: 2,
        image: 'slide2',
        title: '品质生活',
        description: '精选好物，品质之选'
    },
    {
        id: 3,
        image: 'slide3',
        title: '会员专享',
        description: '会员专享优惠，更多福利等你来'
    }
];

// 特色内容数据
const features = [
    {
        id: 1,
        icon: 'fas fa-truck',
        title: '全国配送',
        description: '支持全国范围内配送，快速送达'
    },
    {
        id: 2,
        icon: 'fas fa-undo',
        title: '7天退换',
        description: '商品支持7天无理由退换'
    },
    {
        id: 3,
        icon: 'fas fa-shield-alt',
        title: '品质保证',
        description: '所有商品保证正品，假一赔十'
    },
    {
        id: 4,
        icon: 'fas fa-headset',
        title: '24小时服务',
        description: '专业客服团队，24小时在线服务'
    }
];

// 导出数据
window.appData = {
    users,
    products,
    cartItems,
    orders,
    categories,
    slides,
    features
}; 