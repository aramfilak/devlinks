import React from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../store';
import { IUpload } from '../assets/Icons';

function ImageUpload() {
  const { user, uploadImage } = useAuth();

  const handleProfileImageUpload = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files ? files[0] : null;

    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);
    const isUploadToastId = toast.loading('Uploading...');

    const { success, message } = await uploadImage(formData);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    toast.remove(isUploadToastId);
  };

  return (
    <div className="profile-image-group-wrapper">
      <p className="fake-label">Profile picture</p>

      <label htmlFor="profileImage" style={{ backgroundImage: `url(${user?.profileImage})` }}>
        <IUpload />
        <p>+ Upload Image</p>
      </label>

      <input id="profileImage" type="file" onChange={handleProfileImageUpload} />
      <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
    </div>
  );
}

export default ImageUpload;
