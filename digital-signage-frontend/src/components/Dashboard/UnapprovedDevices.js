// src/components/Dashboard/UnapprovedDevices.js
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { getUnapprovedDevices, approveDevice, updateDeviceDetails, deleteDevice } from '../../services/deviceService';
import { toast } from 'react-toastify';

const UnapprovedDevices = () => {
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceName, setDeviceName] = useState('');
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getUnapprovedDevices();
        setDevices(response.data);
        console.log('Fetched devices:', response.data);
      } catch (error) {
        console.error('Error fetching devices', error.response?.data || error.message);
        toast.error('Error fetching devices');
      }
    };

    fetchDevices();
  }, []);

  const handleManageClick = (device) => {
    console.log('Manage clicked for device:', device);
    setSelectedDevice(device);
    setDeviceName(device.name);
    setLocationId(device.locationId || '');
    setOpen(true);
  };

  const handleApprove = async () => {
    try {
      console.log('Approving device with details:', { id: selectedDevice._id, name: deviceName, locationId });
      await updateDeviceDetails(selectedDevice._id, deviceName, locationId);
      await approveDevice(selectedDevice._id);
      setDevices(devices.filter((device) => device._id !== selectedDevice._id));
      toast.success('Device approved and updated successfully');
      setOpen(false);
    } catch (error) {
      console.error('Error approving device', error.response?.data || error.message);
      toast.error('Error approving device');
    }
  };

  const handleClose = () => {
    console.log('Dialog closed');
    setOpen(false);
  };

  const handleDelete = async (deviceId) => {
    try {
      console.log('Deleting device with ID:', deviceId);
      await deleteDevice(deviceId);
      setDevices(devices.filter((device) => device._id !== deviceId));
      toast.success('Device deleted successfully');
    } catch (error) {
      console.error('Error deleting device', error.response?.data || error.message);
      toast.error('Error deleting device');
    }
  };

  return (
    <Paper>
      <Typography variant="h4" gutterBottom>
        Unapproved Devices
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Identifier</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device._id}>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.identifier}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleManageClick(device)}>
                  Manage Device
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(device._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Manage Device</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Location ID"
            fullWidth
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Close
          </Button>
          <Button onClick={handleApprove} color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UnapprovedDevices;
