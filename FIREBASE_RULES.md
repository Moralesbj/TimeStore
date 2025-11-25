rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAdmin() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isApproved() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.status == 'approved';
    }

    // Users: Users can read their own profile. Admins can read/write all.
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAdmin());
      allow create: if request.auth != null && request.auth.uid == userId; // Registration
      allow update: if isAdmin(); // Only admin can approve/reject/change role
    }

    // Products: Public read, Admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Sales: Approved Users can create. Admins can read all. Users can read own (if we add userId query).
    match /sales/{saleId} {
      allow create: if isApproved();
      allow read: if isAdmin() || (request.auth != null && resource.data.clientId == request.auth.uid);
    }

    // Clients, Suppliers, Purchases: Admin only
    match /clients/{document=**} {
      allow read, write: if isAdmin();
    }
    match /suppliers/{document=**} {
      allow read, write: if isAdmin();
    }
    match /purchases/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
