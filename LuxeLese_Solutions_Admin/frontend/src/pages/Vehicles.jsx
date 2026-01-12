import React, { useState, useEffect } from 'react';
import './Vehicles.css';
import apiService from '../services/api';
import { useSocket } from '../context/SocketContext';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialFormData = {
    name: '',
    brand: '',
    category: '',
    licensePlate: '',
    pricePerDay: '',
    securityDeposit: '',
    status: '',
    transmission: '',
    fuelType: '',
    seatingCapacity: '',
    mileage: '',
    mainImage: '', // This will hold URL for display
    galleryImages: [],
    description: '',
    features: []
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const socket = useSocket();

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const handleDataUpdate = (data) => {
      if (data.type === 'vehicle') {
        console.log('Vehicle data updated:', data);
        fetchVehicles();
      }
    };
    
    if (socket) {
      socket.on('dataUpdated', handleDataUpdate);
      
      return () => {
        socket.off('dataUpdated', handleDataUpdate);
      };
    }
  }, [socket]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await apiService.getVehicles();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Rolls-Royce', 'Range Rover', 'Ferrari', 'Lamborghini', 'Ford'];
  const categories = ['Sedan', 'SUV', 'Luxury', 'Sports', 'Electric'];
  const statuses = ['Available', 'Rented', 'Maintenance'];
  const transmissions = ['Automatic', 'Manual'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const availableFeatures = ['AC', 'GPS', 'Bluetooth', 'Sunroof', 'Heated Seats'];

  const resetForm = () => {
    setFormData(initialFormData);
    setMainImageFile(null);
    setGalleryImageFiles([]);
    setCurrentVehicle(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'seatingCapacity') {
      const num = Number(value);
      setFormData({ ...formData, [name]: isNaN(num) || num < 1 ? 1 : num });
    } else if (name === 'pricePerDay' || name === 'securityDeposit') {
      const num = Number(value);
      setFormData({ ...formData, [name]: isNaN(num) ? 0 : num });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (feature) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter(f => f !== feature)
        : [...formData.features, feature]
    });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setFormData({ ...formData, mainImage: URL.createObjectURL(file) });
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImageFiles(files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, galleryImages: imageUrls });
  };

  const addVehicle = async () => {
    setErrorMessage(''); // Clear previous errors
    if (!formData.name || !formData.brand || !formData.category || !formData.licensePlate || !formData.pricePerDay || !formData.securityDeposit || !formData.status || !formData.transmission || !formData.fuelType || !formData.seatingCapacity || !formData.mileage || formData.features.length === 0 || !mainImageFile) {
      setErrorMessage('Please fill all required fields, select at least one feature, and upload a main image.');
      return;
    }

    // Validate data before sending
    if (formData.seatingCapacity < 1 || formData.seatingCapacity > 50) {
      setErrorMessage('Please enter a valid seating capacity (1-50).');
      return;
    }

    if (formData.pricePerDay <= 0) {
      setErrorMessage('Please enter a valid price per day.');
      return;
    }

    try {
      setLoading(true);
      // Upload main image
      const mainImageUpload = await apiService.uploadSingleImage(mainImageFile);
      if (!mainImageUpload || !mainImageUpload.image) {
        throw new Error('Main image upload failed.');
      }
      const mainImageBase64 = mainImageUpload.image;

      // Upload gallery images
      let galleryImagesBase64 = [];
      if (galleryImageFiles.length > 0) {
        const galleryUpload = await apiService.uploadMultipleImages(galleryImageFiles);
        if (!galleryUpload || !Array.isArray(galleryUpload.images)) {
          throw new Error('Gallery images upload failed.');
        }
        galleryImagesBase64 = galleryUpload.images;
      }

      await apiService.addVehicle({
        ...formData,
        mainImage: mainImageBase64,
        galleryImages: galleryImagesBase64,
        securityDeposit: Number(formData.securityDeposit),
        pricePerDay: Number(formData.pricePerDay),
        seatingCapacity: Number(formData.seatingCapacity)
      });
      // Refresh the vehicles list
      await fetchVehicles();
      resetForm();
      setIsAddModalOpen(false);
      alert('Vehicle added successfully!');
    } catch (err) {
      setErrorMessage('Failed to add vehicle: ' + (err.message || err));
      console.error('Error adding vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  const editVehicle = (vehicle) => {
    resetForm(); // Clear any previous form state
    setCurrentVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      category: vehicle.category,
      licensePlate: vehicle.licensePlate,
      pricePerDay: vehicle.pricePerDay,
      securityDeposit: vehicle.securityDeposit,
      status: vehicle.status,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      seatingCapacity: vehicle.seatingCapacity,
      mileage: vehicle.mileage,
      mainImage: vehicle.mainImage,
      galleryImages: vehicle.galleryImages || [],
      description: vehicle.description,
      features: vehicle.features || []
    });
    setIsEditModalOpen(true);
  };

  const updateVehicle = async () => {
    setErrorMessage(''); // Clear previous errors
    if (!formData.name || !formData.brand || !formData.category || !formData.licensePlate || !formData.pricePerDay || !formData.securityDeposit || !formData.status || !formData.transmission || !formData.fuelType || !formData.seatingCapacity || !formData.mileage || formData.features.length === 0 || !formData.mainImage) {
      setErrorMessage('Please fill all required fields and select at least one feature.');
      return;
    }

    try {
      setLoading(true);
      let mainImageToUpdate = formData.mainImage;
      if (mainImageFile) {
        const mainImageUpload = await apiService.uploadSingleImage(mainImageFile);
        mainImageToUpdate = mainImageUpload.image;
      }

      let galleryImagesToUpdate = formData.galleryImages;
      if (galleryImageFiles.length > 0) {
        const galleryUpload = await apiService.uploadMultipleImages(galleryImageFiles);
        galleryImagesToUpdate = galleryUpload.images;
      }

      await apiService.updateVehicle(currentVehicle._id, {
        ...formData,
        mainImage: mainImageToUpdate,
        galleryImages: galleryImagesToUpdate,
        securityDeposit: Number(formData.securityDeposit),
        pricePerDay: Number(formData.pricePerDay),
        seatingCapacity: Number(formData.seatingCapacity)
      });
      // Refresh the vehicles list
      await fetchVehicles();
      resetForm();
      setIsEditModalOpen(false);
      alert('Vehicle updated successfully!');
    } catch (err) {
      setErrorMessage('Failed to update vehicle: ' + err.message);
      console.error('Error updating vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) {
      return;
    }

    try {
      await apiService.deleteVehicle(id);
      await fetchVehicles(); // Refresh the list
      alert('Vehicle deleted successfully!');
    } catch (err) {
      alert('Failed to delete vehicle: ' + err.message);
      console.error('Error deleting vehicle:', err);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewVehicleDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const closeVehicleDetails = () => {
    setSelectedVehicle(null);
  };

  const openImageViewer = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
    setSelectedImage(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const renderForm = (isEdit) => (
    <form className="vehicle-form">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="form-row">
        <input type="text" name="name" placeholder="Vehicle Name" value={formData.name} onChange={handleInputChange} required />
        <select name="brand" value={formData.brand} onChange={handleInputChange} required>
          <option value="">Select Brand</option>
          {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </select>
      </div>
      <div className="form-row">
        <select name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="text" name="licensePlate" placeholder="License Plate" value={formData.licensePlate} onChange={handleInputChange} required />
      </div>
      <div className="form-row">
        <input type="number" name="pricePerDay" placeholder="Price Per Day" value={formData.pricePerDay} onChange={handleInputChange} required />
        <input type="number" name="securityDeposit" placeholder="Security Deposit" value={formData.securityDeposit} onChange={handleInputChange} required />
      </div>
      <div className="form-row">
        <select name="status" value={formData.status} onChange={handleInputChange} required>
          <option value="">Select Status</option>
          {statuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        <select name="transmission" value={formData.transmission} onChange={handleInputChange} required>
          <option value="">Select Transmission</option>
          {transmissions.map(trans => <option key={trans} value={trans}>{trans}</option>)}
        </select>
      </div>
      <div className="form-row">
        <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} required>
          <option value="">Select Fuel Type</option>
          {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
        </select>
        <input type="number" name="seatingCapacity" placeholder="Seating Capacity" value={formData.seatingCapacity} onChange={handleInputChange} required />
      </div>
      <input type="text" name="mileage" placeholder="Mileage/Range" value={formData.mileage} onChange={handleInputChange} required />
      <div className="file-inputs">
        <label>Main Image:</label>
        {formData.mainImage && !mainImageFile && <img src={formData.mainImage} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />}
        <input type="file" accept="image/*" onChange={handleMainImageChange} required={!isEdit} />
        <label>Gallery Images:</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {formData.galleryImages && formData.galleryImages.map((img, index) => (
            <img key={index} src={img} style={{ width: '80px', height: 'auto' }} />
          ))}
        </div>
        <input type="file" multiple accept="image/*" onChange={handleGalleryChange} />
      </div>
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required></textarea>
      <div className="features-section">
        <label>Features:</label>
        <div className="features-grid">
          {availableFeatures.map(feature => (
            <label key={feature} className="feature-checkbox">
              <input
                type="checkbox"
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="button" onClick={isEdit ? updateVehicle : addVehicle} className="submit-btn">
          {isEdit ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
        <button type="button" onClick={isEdit ? handleCloseEditModal : handleCloseAddModal} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="vehicles-page">
      <div className="page-header">
        <h2>Vehicles Management</h2>
        <button onClick={handleOpenAddModal} className="add-btn">Add Vehicle</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by vehicle name or license plate..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <p className="loading">Loading vehicles...</p>}
      {error && <p className="error">{error}</p>}

      {/* Add Vehicle Form */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseAddModal}>×</button>
            <h3>Add New Vehicle</h3>
            <div className="modal-body">
              {renderForm(false)}
            </div>
          </div>
        </div>
      )}

      {/* Edit Vehicle Form */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseEditModal}>×</button>
            <h3>Edit Vehicle</h3>
            <div className="modal-body">
              {renderForm(true)}
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="modal-overlay" onClick={closeVehicleDetails}>
          <div className="modal-content vehicle-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeVehicleDetails}>×</button>
            <h3>{selectedVehicle.name}</h3>
            <div className="modal-body">
              <div className="vehicle-details">
                <div className="main-image">
                  <img 
                    src={selectedVehicle.mainImage} 
                    alt={selectedVehicle.name} 
                    onClick={() => openImageViewer(selectedVehicle.mainImage)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {selectedVehicle.galleryImages && selectedVehicle.galleryImages.length > 0 && (
                  <div className="gallery-images">
                    <h4>Gallery Images</h4>
                    <div className="gallery-grid">
                      {selectedVehicle.galleryImages.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${selectedVehicle.name} ${index + 1}`}
                          onClick={() => openImageViewer(image)}
                          style={{ cursor: 'pointer', width: '100px', height: '100px', objectFit: 'cover', margin: '5px', borderRadius: '5px' }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="details-info">
                <p><strong>Brand:</strong> {selectedVehicle.brand}</p>
                <p><strong>Category:</strong> {selectedVehicle.category}</p>
                <p><strong>License Plate:</strong> {selectedVehicle.licensePlate}</p>
                <p><strong>Price Per Day:</strong> ${selectedVehicle.pricePerDay}</p>
                <p><strong>Security Deposit:</strong> ${selectedVehicle.securityDeposit}</p>
                <p><strong>Status:</strong> {selectedVehicle.status}</p>
                <p><strong>Transmission:</strong> {selectedVehicle.transmission}</p>
                <p><strong>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
                <p><strong>Seating Capacity:</strong> {selectedVehicle.seatingCapacity}</p>
                <p><strong>Mileage:</strong> {selectedVehicle.mileage}</p>
                <p><strong>Description:</strong> {selectedVehicle.description}</p>
                <p><strong>Features:</strong> {selectedVehicle.features?.join(', ')}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Grid */}
      <div className="vehicles-grid">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle._id} className="vehicle-card" onClick={() => viewVehicleDetails(vehicle)}>
            <div className="card-image">
              <img src={vehicle.mainImage} alt={vehicle.name} />
            </div>
            <div className="card-content">
              <h4>{vehicle.name}</h4>
              <p className="brand">{vehicle.brand}</p>
              <p className="license">{vehicle.licensePlate}</p>
              <p className="price">${vehicle.pricePerDay}/day</p>
              <span className={`status ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span>
              {vehicle.description && <p className="description">{vehicle.description}</p>}
            </div>
            <div className="card-actions">
              <button onClick={(e) => { e.stopPropagation(); editVehicle(vehicle); }} className="edit-btn">Edit</button>
              <button onClick={(e) => { e.stopPropagation(); deleteVehicle(vehicle._id); }} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Viewer Modal */}
      {showImageViewer && selectedImage && (
        <div className="modal-overlay" onClick={closeImageViewer}>
          <div className="image-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeImageViewer}>×</button>
            <img src={selectedImage} className="full-image" />
            <div className="image-actions">
              <a 
                href={selectedImage} 
                download="vehicle-image.jpg"
                className="download-btn"
              >
                Download Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;