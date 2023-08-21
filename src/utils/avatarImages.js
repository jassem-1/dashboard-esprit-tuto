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
    require('../assets/avatar-images/12.jpg'),
    require('../assets/avatar-images/13.jpg'),
    require('../assets/avatar-images/14.jpg'),
    require('../assets/avatar-images/15.jpg'),
    require('../assets/avatar-images/16.jpg'),
    require('../assets/avatar-images/17.jpg'),
    require('../assets/avatar-images/18.jpg'),
    require('../assets/avatar-images/19.jpg'),
    require('../assets/avatar-images/21.jpg'),
    require('../assets/avatar-images/20.jpg'),
    require('../assets/avatar-images/22.jpg'),
    require('../assets/avatar-images/23.jpg'),
    require('../assets/avatar-images/24.jpg'),

  
  ];
  
  
  // Function to dynamically load an image based on index
  export const loadAvatarImage = (index) => {
    if (index >= 0 && index < avatarImagePaths.length) {
      return avatarImagePaths[index];
    }
    // Return a default image path if index is out of bounds
    return avatarImagePaths[0]; // Change this to your default image
  };