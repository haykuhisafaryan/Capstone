import React, { BaseSyntheticEvent } from "react";
import { Chip } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import StyledMenu from "./StyledMenu";
import axios from "../../../utils/axios";
import { ValueObject } from "../types";
import { getPhotoUrl } from "../../../utils";

export default function BookItem({
  updateBooksList,
  onEditClick,
  onQRClick,
  book,
}: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const containerStyles = {
    maxWidth: 345,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const onDelete = async () => {
    await axios.delete(`/books/${book.id}`);
    await updateBooksList();
  };

  const onEdit = (e: BaseSyntheticEvent) => {
    onEditClick(book);
    handleClose(e);
  };

  return (
    <Card sx={containerStyles}>
      <div>
        <CardHeader
          action={
            <IconButton
              id="basic-button"
              aria-label="settings"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={onEdit} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={onDelete} disableRipple>
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </StyledMenu>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <span>
              {book.title} by <b>{book.author.name}</b>
            </span>
          }
          subheader={new Date(book.publishDate).toLocaleString()}
          subheaderTypographyProps={{ sx: { fontSize: 12 } }}
          titleTypographyProps={{ variant: "body1" }}
        />
        <CardMedia
          component="img"
          height="300"
          image={getPhotoUrl(book.coverImageId)}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
      </div>
      <CardActions
        disableSpacing
        sx={{
          overflowX: "auto",
        }}
      >
        <IconButton
          aria-label="download QR"
          size="large"
          onClick={() => onQRClick(book)}
        >
          <QrCode2Icon />
        </IconButton>
        {book.genres.map((genre: ValueObject) => {
          return <Chip label={genre} key={genre.id} sx={{ ml: "4px" }} />;
        })}
      </CardActions>
    </Card>
  );
}
