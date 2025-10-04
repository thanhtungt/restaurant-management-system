# 🍽️ Restaurant Management System

Hệ thống quản lý nhà hàng hiện đại với React + TypeScript + Ant Design

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.27.4-blue.svg)](https://ant.design/)

---

##  Mục lục

- [Tính năng](#-tính-năng)
 [Demo](#-demo)-
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Documentation](#-documentation)
- [Tech Stack](#-tech-stack)
- [Scripts](#-scripts)

---

##  Tính năng

###  Đã hoàn thành:
-  **Dashboard** - Thống kê doanh thu, nhập/xuất kho, biểu đồ
-  **Quản lý bàn** - Theo dõi trạng thái bàn, sắp xếp theo tầng
-  **Menu** - Hiển thị món ăn, filter theo category, search
-  **Order** - Thêm món, điều chỉnh số lượng, tính tổng tiền
-  **Payment** - 3 phương thức (Tiền mặt, Thẻ, Chuyển khoản)
-  **Modern UI** - Theo thiết kế Figma, responsive, horizontal scroll

##  Demo
---

##  Cài đặt

### Yêu cầu:
- Node.js >= 14
- npm hoặc yarn

### Bước 1: Clone project
```bash
git clone https://github.com/thanhtungt/restaurant-management-system.git
cd restaurant-management-system
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy development server
```bash
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

---

##  Cấu trúc dự án

```
src/
├── modules/
│   ├── menu/              # Menu module
│   │   ├── components/    # MenuItems, MenuItemCard, CategoryFilter
│   │   ├── hooks/         # useMenu (state management)
│   │   ├── services/      # API calls
│   │   └── pages/         # MenuPage
│   ├── order/             # Order module
│   │   ├── components/    # OrderDetails, OrderItemComponent
│   │   ├── hooks/         # useOrder (cart management)
│   │   └── services/      # orderService
│   ├── payment/           # Payment module
│   │   ├── components/    # PaymentModal
│   │   └── services/      # paymentService
│   ├── table-management/  # Table management
│   │   ├── components/
│   │   ├── pages/         # TableManagementPage (main)
│   │   └── services/      # tableService
│   ├── dashboard/         # Dashboard
│   │   └── pages/         # DashboardPage
│   └── auth/              # Authentication
│       └── pages/         # LoginPage
├── services/
│   └── apiService.ts      #  Mock data & API handler
├── types/                 # TypeScript interfaces
├── config/                # Configuration
├── routes/                # React Router setup
└── components/            # Shared components

public/
└── menu/                  #  Menu images
```

---

##  Documentation

---

##  Tech Stack

### Frontend:
- **React** 19.1.1 - UI framework
- **TypeScript** 4.9.5 - Type safety
- **Ant Design** 5.27.4 - UI component library
- **Recharts** 2.12.0 - Charts & graphs
- **React Router** 7.9.3 - Routing

### State Management:
- Custom hooks (useMenu, useOrder)
- React Context (AuthContext)

### API:
- Mock data (development)
- RESTful API endpoints (production ready)

---

##  Scripts

### Development
```bash
npm start          # Chạy dev server (port 3000)
npm test           # Chạy tests
```

### Production
```bash
npm run build      # Build production
npm run eject      # Eject CRA config (không khuyến khích)
```

### Code Quality
```bash
npm run lint       # Lint code
npm run format     # Format code
```

---

##  Thêm món ăn mới

### Bước 1: Edit mock data
File: `src/services/apiService.ts` (dòng ~85)

```javascript
if (url.includes(API_ENDPOINTS.menu)) {
  return {
    data: [
      // ... món cũ ...
      
      // THÊM MỚI
      {
        id: 'mon-moi',
        name: 'Tên món ăn',
        price: 450000,              // 450000 = GNF 4500.00
        image: '/menu/mon-moi.jpg',
        category: 'donhau',
        description: 'Mô tả món',
      },
    ]
  };
}
```

### Bước 2: Thêm hình ảnh
Đặt file vào: `public/menu/mon-moi.jpg`

### Bước 3: Restart server
```bash
npm start
```

---

##  Contributing

---

##  License

This project is licensed under the MIT License.

---

##  Author

**thanhtungt**  
GitHub: [@thanhtungt](https://github.com/thanhtungt)

---

##  Acknowledgments

- Design inspired by modern POS systems
- UI components from [Ant Design](https://ant.design/)
- Icons from [Ant Design Icons](https://ant.design/components/icon/)

---

** Happy coding!**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
