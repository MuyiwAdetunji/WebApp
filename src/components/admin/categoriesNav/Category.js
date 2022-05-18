import React, { useState, useEffect, useRef } from "react";

import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Popper,
} from "@mui/material";
import {
  getAllCategories,
  deleteCategory,
  getCategory,
  updateCategory,
  createCategory,
} from "../../../apis";
import { useAdminEmailStyles } from "../../../styles/adminStyle";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AdminCategory = () => {
  const classes = useAdminEmailStyles();

  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const popperRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState("");

  // UPDATE CATEGORY CODE
  const [name, setName] = useState("");

  // END UPDATE CATEGORY CODE

  const openPopper = Boolean(anchorEl);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = async (slug) => {
    setName("");
    setOpenUpdate(true);
    setLoading(true);
    const res = await getCategory(slug);
    if (res) {
      setName(res.category.name);
      setLoading(false);
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createCategory(category, user.token);
    if (res) {
      setLoading(false);
      handleClose();
      setCategory("");
      history.push("/admin/categories");
      toast.success("Category Created Sucessfully");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateCategory(value.slug, name, user.token);
    if (res) {
      setLoading(false);
      handleCloseUpdate();
      setName("");
      history.push("/admin/categories");
      toast.success("Category Updated Sucessfully");
      window.location.reload();
    }
  };

  const columns = [{ field: "name", headerName: "Categories", width: 500 }];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setLoading(true);
    if (data) {
      setCategories(data.category);

      setTotal(data.length);
      setLoading(false);
    }
  };

  const handlePopperOpen = (event) => {
    const id = event.currentTarget.dataset.id;

    const row = categories.find((r) => r._id === id);
    setValue(row);
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = (event) => {
    if (
      anchorEl == null ||
      popperRef.current.contains(event.nativeEvent.relatedTarget)
    ) {
      return;
    }

    setAnchorEl(null);
  };

  const handleRemove = async (slug, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setLoading(true);

      const deleted = await deleteCategory(slug, user.token);

      if (deleted) {
        setLoading(false);
        toast.success(`${name} deleted successfully`);
        loadCategories();
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" component="body">
          All Categories
        </Typography>
        <Button variant="primary" onClick={handleClickOpen}>
          New Category
        </Button>
      </div>
      <Box sx={{ py: 2 }}>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={categories}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
            componentsProps={{
              row: {
                onMouseEnter: handlePopperOpen,
                onMouseLeave: handlePopperClose,
              },
            }}
            // checkboxSelection
            sx={{
              boxShadow: 2,
              border: 2,
              "& .MuiDataGrid-row": {
                zIndex: 10,
              },
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new category, please enter the name of the category.
            Remember the categories are unique.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Category</Button>
        </DialogActions>
      </Dialog>

      {/* UPDATE DIALOG */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update a category, please modify the name of the category.
            Remember the categories are unique.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handleUpdate}>Update Category</Button>
        </DialogActions>
      </Dialog>

      <Popper
        ref={popperRef}
        open={openPopper}
        anchorEl={anchorEl}
        placement={"right"}
        // transition
        // disablePortal={true}
        onMouseLeave={() => setAnchorEl(null)}
      >
        {({ TransitionProps }) => (
          // <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              transform: "translateX(500px)",
              // zIndex: 100,
            }}
          >
            <Button onClick={() => handleClickOpenUpdate(value.slug)}>
              Edit
            </Button>
            <Button onClick={() => handleRemove(value.slug, value.name)}>
              Delete
            </Button>
          </Paper>
          // </Fade>
        )}
      </Popper>
    </div>
  );
};

export default AdminCategory;
