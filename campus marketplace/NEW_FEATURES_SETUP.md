# Campus Marketplace - New Features Setup Guide

## 🆕 New Features Implemented

### 1. Unread Message Notifications ✅
- **Red badge** on conversation cards showing unread count
- **Auto-mark as read** when opening conversation
- **Animated pulse** effect on unread badges

### 2. Enhanced Search & Filters ✅
- **Price Range Filter**: Min/Max price inputs
- **New Sort Options**:
  - Most Viewed (popular products)
  - Most Favorited
  - Price: Low to High
  - Price: High to Low
  - Newest

### 3. Favorites/Wishlist ✅
- **Heart Icon** on product cards
- **Toggle Favorite** (add/remove)
- **Dedicated Favorites Page** at `/favorites`
- **Favorite Count** displayed on products

### 4. Product Analytics ✅
- **View Counter**: Auto-increments on product view
- **Favorite Counter**: Updates when users favorite
- **Stats Display**: Shows views and favorites on cards

### 5. Image Sharing in Chat ✅
- **Upload Images** in chat messages
- **Image Preview** before sending
- **Clickable Images** to open in new tab
- **5MB Size Limit** with validation

### 6. Toast Notification System ✅
- **Context API Based** notification system
- **Three Types**: Success, Error, Info
- **Auto-dismiss** after 3 seconds
- **Closeable** with X button

---

## 📋 Appwrite Setup Required

### New Collections Needed

#### 1. **favorites** Collection
Create in Appwrite Console → Databases → Create Collection

**Attributes:**
```
- userId (string, required, size: 255)
- productId (string, required, size: 255)
- createdAt (string, required, size: 255)
```

**Indexes:**
- `userId_idx` on `userId` (ASC)
- `productId_idx` on `productId` (ASC)
- `user_product_idx` on `userId, productId` (compound, ASC, ASC)

**Permissions:**
- Read: `any`
- Create: `users`
- Update: `users`
- Delete: `users`

### Update Existing Collections

#### Update **conversations** Collection
**Add New Attributes:**
```
- unreadCount (integer, required, default: 0)
- lastReadBy (string, optional, size: 255)
```

#### Update **messages** Collection
**Add New Attribute:**
```
- imageId (string, optional, size: 255)
```

#### Update **products** Collection
**Add New Attributes:**
```
- views (integer, required, default: 0)
- favoriteCount (integer, required, default: 0)
```

---

## 🔐 Environment Variables

Update your `.env` file:

```env
# Existing Variables
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

# Existing Collections
VITE_APPWRITE_COLLECTION_PRODUCTS_ID=your_products_collection_id
VITE_APPWRITE_COLLECTION_CONVERSATIONS_ID=your_conversations_collection_id
VITE_APPWRITE_COLLECTION_MESSAGES_ID=your_messages_collection_id

# NEW Collection - Add This
VITE_APPWRITE_COLLECTION_FAVORITES_ID=your_favorites_collection_id
```

---

## 🚀 Usage Examples

### Using Favorites
```jsx
// In any component
import favoriteService from './appwrite/favoriteService';

// Add to favorites
await favoriteService.addFavorite(userId, productId);

// Remove from favorites
await favoriteService.removeFavorite(userId, productId);

// Check if favorited
const isFav = await favoriteService.isFavorited(userId, productId);
```

### Using Toast Notifications
```jsx
// Wrap your app with ToastProvider in main.jsx or App.jsx
import { ToastProvider, useToast } from './Components/Toast/ToastContainer';

// In any component
const { showToast } = useToast();

showToast('Product added!', 'success');
showToast('Failed to save', 'error');
showToast('Loading...', 'info');
```

---

## 📝 Testing Checklist

- [ ] Create favorites collection with correct attributes
- [ ] Update conversations collection with unreadCount, lastReadBy
- [ ] Update messages collection with imageId
- [ ] Update products collection with views, favoriteCount
- [ ] Add VITE_APPWRITE_COLLECTION_FAVORITES_ID to .env
- [ ] Test favoriting products
- [ ] Test price range filter
- [ ] Test viewing favorites page
- [ ] Test sending images in chat
- [ ] Test unread message badges
- [ ] Verify all existing features still work

---

## 🐛 Common Issues

### Issue: "Collection not found"
**Solution**: Ensure you added the favorites collection ID to `.env` and restarted the dev server

### Issue: "Attribute not found"
**Solution**: Make sure you added the new attributes to existing collections (unreadCount, imageId, views, favoriteCount)

### Issue: Toast notifications not showing
**Solution**: Verify ToastProvider is wrapping your app in main.jsx

### Issue: Images not uploading in chat
**Solution**: Check Appwrite bucket permissions allow file uploads

---

## 📞 Need Help?

If you encounter issues:
1. Check Appwrite Console for collection structure
2. Verify all environment variables are set
3. Check browser console for error messages
4. Ensure you restarted the dev server after .env changes

---

**Last Updated**: December 2025
**Version**: 2.0.0
