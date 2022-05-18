import React, { useState, useEffect } from "react";

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  OutlinedInput,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";
import {
  getAllCategories,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createSubCategory,
} from "../../../apis";
import { useAdminEmailStyles } from "../../../styles/adminStyle";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";

const AdminSubCategory = () => {
  const classes = useAdminEmailStyles();

  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openList, setOpenList] = useState(false);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = async (slug) => {
    setSubCategory("");
    setCategory("");
    setLoading(true);
    setOpenUpdate(true);
    setValue(slug);
    const res = await getSubCategory(slug);
    if (res) {
      setSubCategory(res.subCategory.name);
      setCategory(res.subCategory.parent);
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createSubCategory(subCategory, category, user.token);
    if (res) {
      setLoading(false);
      history.push("/admin/categories");
      handleClose();
      setCategory("");
      setSubCategory("");
      toast.success("Sub Category Created Sucessfully");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateSubCategory(
      value,
      subCategory,
      category,
      user.token
    );
    if (res) {
      setLoading(false);
      history.push("/admin/categories");
      handleCloseUpdate();
      setCategory("");
      setSubCategory("");
      toast.success("Sub Category Updated Sucessfully");
    }
  };

  const handleRemove = async (slug, name) => {
    let answer = window.confirm("Delete?");

    if (answer) {
      setLoading(true);
      const deleted = deleteSubCategory(slug, user.token);

      if (deleted) {
        console.log(deleted);
        setLoading(false);
        loadSubCategories();
        toast.success(`${name} deleted`);
      }
    }
  };

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const res = await getAllCategories();
    if (res) {
      setCategories(res.category);
      setLoading(false);
    }
  };

  const loadSubCategories = async () => {
    const res = await getAllSubCategories();
    setSubCategories(res.subCategory);
    setTotal(res.length);
  };

  const result = categories.map((category) => {
    category.subCategories = subCategories.filter(
      (a) => a.parent === category._id
    );
    return category;
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" component="body">
          All SubCategories
        </Typography>
        <Button variant="primary" onClick={handleClickOpen}>
          New SubCategory
        </Button>
      </div>
      <Box sx={{ py: 2 }}>
        <div style={{ height: 600, width: "100%" }}>
          {result.map((c) => (
            <div key={c._id}>
              <List>
                <ListItemButton
                  onClick={handleClick}
                  sx={{
                    background: "#E9F2E4",
                    color: "#7AB259",
                    fontWeight: "bold",
                  }}
                >
                  <ListItemText primary={c.name} />
                  {openList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </List>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {c?.subCategories?.map((item) => (
                    <ListItem sx={{ pl: 4 }} key={item._id}>
                      <ListItemText primary={item.name} />
                      <Button onClick={() => handleClickOpenUpdate(item.slug)}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleRemove(item.slug, item.name)}
                      >
                        Delete
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Sub Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new sub-category, please enter the name of the
            sub-category, and select the category it belongs. Remember the
            sub-categories are unique.
          </DialogContentText>
          <Box sx={{ pt: 2 }}>
            <Stack spacing={3}>
              <FormControl>
                <InputLabel htmlFor="title" required>
                  SubCategory
                </InputLabel>
                <OutlinedInput
                  id="name"
                  required
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  label="SubCategory"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  required
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="primary">
            Add Sub Category
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update SubCategory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update a sub-category, please enter the name of the sub-category,
            and select the category it belongs. Remember the sub-categories are
            unique.
          </DialogContentText>
          <Box sx={{ pt: 2 }}>
            <Stack spacing={3}>
              <FormControl>
                <InputLabel htmlFor="title" required>
                  SubCategory
                </InputLabel>
                <OutlinedInput
                  id="name"
                  required
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  label="SubCategory"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  required
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handleUpdate} variant="primary">
            Update Sub Category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminSubCategory;
