// // Simple server for testing expiration notifications
// const express = require('express');
// const cors = require('cors');
// const db = require('./src/models');
// const NotificationService = require('./src/services/notificationService');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Get notifications
// app.get('/api/notifications', async (req, res) => {
//   try {
//     const { limit = 10 } = req.query;
//     const notifications = await NotificationService.getRecentNotifications(parseInt(limit));
//     const unreadCount = await NotificationService.getUnreadCount();

//     res.json({
//       success: true,
//       message: "Notifications retrieved successfully",
//       data: {
//         notifications,
//         unreadCount,
//         total: notifications.length,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching notifications",
//       error: error.message,
//     });
//   }
// });

// // Create sample expiration notifications
// app.post('/api/notifications/samples/create', async (req, res) => {
//   try {
//     const sampleNotifications = [];

//     // Create expiring_soon notification
//     const expiringSoon = await NotificationService.createNotification({
//       type: 'expiring_soon',
//       title: 'ផលិតផលជិតផុតកំណត់ - Product Expiring Soon',
//       message: 'ផលិតផល "iPhone 15 Pro" នឹងផុតកំណត់ក្នុងរយៈពេល 7 ថ្ងៃទៀត។',
//       referenceId: 2
//     });
//     sampleNotifications.push(expiringSoon);

//     // Create expiring_today notification
//     const expiringToday = await NotificationService.createNotification({
//       type: 'expiring_today',
//       title: 'ផលិតផលផុតកំណត់ថ្ងៃនេះ - Product Expires Today',
//       message: 'ផលិតផល "Samsung S20" ផុតកំណត់ថ្ងៃនេះ! សូមពិនិត្យមុនពេលប្រើប្រាស់។',
//       referenceId: 3
//     });
//     sampleNotifications.push(expiringToday);

//     // Create expired notification
//     const expired = await NotificationService.createNotification({
//       type: 'expired',
//       title: 'ផលិតផលបានផុតកំណត់ - Product Expired',
//       message: 'ផលិតផល "Galaxy Note20 Ultra" បានផុតកំណត់ 2 ថ្ងៃហើយ! សូមយកចេញពីស្តុក។',
//       referenceId: 4
//     });
//     sampleNotifications.push(expired);

//     res.json({
//       success: true,
//       message: 'Sample expiration notifications created successfully',
//       data: {
//         created: sampleNotifications.length,
//         notifications: sampleNotifications
//       }
//     });
//   } catch (error) {
//     console.error('Error creating sample notifications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating sample notifications',
//       error: error.message
//     });
//   }
// });

// const PORT = 3001;

// async function startServer() {
//   try {
//     await db.sequelize.authenticate();
//     console.log('✅ Database connected');
    
//     app.listen(PORT, () => {
//       console.log(`✅ Simple server running on http://localhost:${PORT}`);
//       console.log('🎯 Test endpoints:');
//       console.log(`   GET  http://localhost:${PORT}/api/notifications`);
//       console.log(`   POST http://localhost:${PORT}/api/notifications/samples/create`);
//     });
//   } catch (error) {
//     console.error('❌ Failed to start server:', error);
//   }
// }

// startServer();