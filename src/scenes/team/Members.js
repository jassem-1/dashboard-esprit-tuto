import axios from "axios";
import React, { useState, useEffect } from "react";

import { Box, Typography, useTheme,IconButton , Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer,GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AdminVerificationDialog from "../../components/AdminVerificationDialog";


function Members() {


  function CustomToolbar({ onVerifyAdmin }) {
    const handleVerifyAdmin = () => {
      onVerifyAdmin();
    };
    return (
      <GridToolbarContainer 
    
      >
        <GridToolbarColumnsButton style={{ color: 'white' }} 
      />
        <GridToolbarFilterButton  style={{ color: 'white' }} />
        <GridToolbarDensitySelector  style={{ color: 'white' }} />
        <GridToolbarExport   style={{ color: 'white' }}/ >
        <IconButton style={{ color: 'grey',fontSize:"small" }} onClick={handleVerifyAdmin}>
       Add a member<AddCircleOutlineIcon /> 
      </IconButton>
      
      </GridToolbarContainer>
    );
  }


  const [isVerifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const handleVerifyDialogOpen = () => {
    setVerifyDialogOpen(true);
  };

  const handleVerifyDialogClose = () => {
    setVerifyDialogOpen(false);
    setAdminCredentials({
      email: "",
      password: "",
    });
  };
  const handleAdminVerification = async  (credentials) => {

    try {
      const response = await axios.post("http://localhost:8080/admin/verify", credentials);
      if (response.status === 200) {
        // Admin verification successful, open the member dialog
        setAdminCredentials(credentials);
        setVerifyDialogOpen(false);
        setMemberDialogOpen(true);
      } else {
        // Show error message indicating failed verification
        console.error("Admin verification failed");
      }
    } catch (error) {
      console.error("Error verifying admin credentials:", error);
    }
  };


  const [isMemberDialogOpen, setMemberDialogOpen] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    accessLevel: "",
  });
  const handleMemberDialogOpen = () => {
    setMemberDialogOpen(true);
  };

  const handleMemberDialogClose = () => {
    setMemberDialogOpen(false);
    setNewMemberData({
      username: "",
      name: "",
      email: "",
      phone: "",
      accessLevel: "",
    });
  };
  const handleAddMember = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users", newMemberData);
      const newMember = response.data; 
      setUserData((prevData) => [...prevData, newMember]);
      handleMemberDialogClose();
    } catch (error) {
      console.error("Error adding new member:", error);
    }
  };
  const handleNewMemberDataChange = (field, value) => {
    setNewMemberData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userData, setUserData] = useState([]);
    const fetchUserData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/users"); 
          setUserData(response.data); 
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      useEffect(() => {
        fetchUserData();
      }, []);
    
    const columns = [
      
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column-cell",
      },
      {
        field: "username",
        headerName: "Last name",
        flex: 1,
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "accessLevel",
        headerName: "Access Level",
        flex: 1,
        renderCell: ({ row: { accessLevel } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                accessLevel === "manager"
                  ? colors.redAccent[800]
                  : accessLevel === "user"
                  ? colors.redAccent[700]
                  : colors.redAccent[700]
              }
              borderRadius="4px"
            >
              
              {accessLevel === "manager" && <SecurityOutlinedIcon />}
              {accessLevel === "user" && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {accessLevel}
              </Typography>
            </Box>
          );
        },
      },
    ];
  
    return (
      <Box m="20px">
        <Header title="MEMBERS" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",fontSize:"20px"
            },
            "& .name-column--cell": {
              color: colors.redAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.grey[900],
              borderBottom: "none",fontSize:"20px"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.grey[700],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.grey[900],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
        <DataGrid rows={userData} columns={columns} slots={{ toolbar: () => <CustomToolbar onVerifyAdmin={handleVerifyDialogOpen} /> }} />

        </Box>
        <Dialog open={isMemberDialogOpen} onClose={handleMemberDialogClose}>
<DialogTitle sx={{ textDecoration: "underline", fontSize: "15px" }}>Add New Member</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            value={newMemberData.username}
            onChange={(e) => handleNewMemberDataChange("username", e.target.value)}
            fullWidth
          />
          <TextField
          label="Name"
          value={newMemberData.name}
          onChange={(e) => handleNewMemberDataChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={newMemberData.email}
          onChange={(e) => handleNewMemberDataChange("email", e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
          value={newMemberData.phone}
          onChange={(e) => handleNewMemberDataChange("phone", e.target.value)}
          fullWidth
        />
        <TextField
          label="Access Level"
          value={newMemberData.accessLevel}
          onChange={(e) => handleNewMemberDataChange("accessLevel", e.target.value)}
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMemberDialogClose} style={{ color: 'white' }}>Cancel</Button>
          <Button onClick={handleAddMember} style={{ color: 'white' }}>Add</Button>
        </DialogActions>
      </Dialog>
      <AdminVerificationDialog
      open={isVerifyDialogOpen}
      onClose={handleVerifyDialogClose}
      onVerify={handleAdminVerification}
    />
      </Box>
    );
  };
export default Members