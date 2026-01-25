// const express = require('express');
// const cors = require('cors');
// const NotificationService = require('./src/services/notificationService');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Debug route to see exactly what data is being returned
// app.get('/api/debug-notifications', async (req, res) => {
//   try {
//     console.log('🔍 Debug: Getting notifications...');
    
//     const notifications = await NotificationService.getRecentNotifications(10);
//     const unreadCount = await NotificationService.getUnreadCount();

//     console.log('📊 Debug: Found notifications:', notifications.length);
    
//     // Log each notification in detail
//     notifications.forEach((notification, index) => {
//       console.log(`\n📋 Notification ${index + 1}:`);
//       console.log('  - ID:', notification.id);
//       console.log('  - Type:', notification.type);
//       console.log('  - Title:', notification.title);
//       console.log('  - Reference ID:', notification.reference_id);
//       console.log('  - Product Data:', notification.Product ? {
//         id: notification.Product.id,
//         name: notification.Product.name,
//         expire_date: notification.Product.expire_date
//       } : 'null');
//       console.log('  - Raw Product:', notification.Product);
//     });

//     res.json({
//       success: true,
//       message: "Debug notifications retrieved successfully",
//       data: {
//         notifications,
//         unreadCount,
//         total: notifications.length,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error fetching notifications:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching notifications",
//       error: error.message,
//     });
//   }
// });

// const PORT = 3004;
// app.listen(PORT, () => {
//   console.log(`🔧 Debug server running on http://localhost:${PORT}`);
//   console.log(`📡 Debug API: http://localhost:${PORT}/api/debug-notifications`);
// });