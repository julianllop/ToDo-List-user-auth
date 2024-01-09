import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../../Redux/actions";
import Task from "../task/task";
import styles from "./taskDetail.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const TaskDetail = ({ title, description }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isSmallScreen = useMediaQuery("(max-width:400px)");
    const isMediumScreen = useMediaQuery("(max-width:550px)");
    const isBigScreen = useMediaQuery("(max-width:550px)");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMediumScreen ? "60%" : "40%",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        outline: "none",
    };

    return (
        <div className={styles.modal}>
            <Typography
                sx={{
                    color: "black",
                    borderRadius: "10px",
                    "&:hover": {
                        color: "#1976D2",
                        cursor: "pointer",
                    },
                    border: "none",
                    display: "flex",
                    margin: 0,

                    ...(isMediumScreen && {
                        fontSize: "0.9rem",
                    }),
                }}
                onClick={handleOpen}
            >
                <Task title={title} description={description} />
            </Typography>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                fontSize: "25px",
                                fontWeight: "700",
                                background:
                                    "linear-gradient(90deg, rgb(25,118,210) 0%, rgba(140,214,255,1)  100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",

                                ...(isSmallScreen && {
                                    fontSize: "20px",
                                }),
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{
                                mt: 2,
                                overflowWrap: "break-word",
                                
                                ...(isSmallScreen && {
                                    fontSize: "12px",
                                }),
                            }}
                        >
                            {description
                                ? description
                                : "This task does not have a description"}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default TaskDetail;
