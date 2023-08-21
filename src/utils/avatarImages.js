export const avatarImagePaths = [
    require('../assets/avatar-images/1.png'),
    require('../assets/avatar-images/2.png'),
    require('../assets/avatar-images/3.png'),
    require('../assets/avatar-images/4.png'),
    require('../assets/avatar-images/5.png'),
    require('../assets/avatar-images/6.png'),
    require('../assets/avatar-images/8.jpg'),
    require('../assets/avatar-images/9.png'),
    require('../assets/avatar-images/9.jpg'),
    require('../assets/avatar-images/11.jpg'),
  
  ];
  
  
  // Function to dynamically load an image based on index
  export const loadAvatarImage = (index) => {
    if (index >= 0 && index < avatarImagePaths.length) {
      return avatarImagePaths[index];
    }
    // Return a default image path if index is out of bounds
    return avatarImagePaths[0]; // Change this to your default image
  };