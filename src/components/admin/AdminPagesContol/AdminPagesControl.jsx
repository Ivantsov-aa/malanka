import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Button/button";
import { Input } from "../../Input/Input";
import { Select } from "../../select/select";

import {
    AdminPagesControlContainer,
    EditTextPanelContainer,
} from "./AdminPagesControl.style";
import { MediaUploader } from "../../MediaUploader/MediaUploader";
import { useLocation } from "react-router-dom";
import { url } from "../AuthForm/AuthForm";
import {generateId} from "../../../App";

export const AdminPagesControl = (props) => {
    const [value, setValue] = useState("");
    const [editParams, setEditParams] = useState(null);
    const [uploaderTarget, setUploaderTarget] = useState(null);
    const { userInfo } = useSelector((store) => store.authAdmin);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            handleDetechIframe();
        }, 1000);
    }, [location.pathname]);

    const handleDetechIframe = () => {
        const uploadButton = document.createElement("button");
        uploadButton.innerHTML = "Загрузить видео";
        uploadButton.classList.add("upload-video__button");
        const iframe = document.querySelector(".video__container iframe");

        if (iframe && !iframe.parentElement.contains(uploadButton)) {
            iframe.parentElement.append(uploadButton);
            uploadButton.addEventListener("click", () => {
                setUploaderTarget({ target: iframe, type: "video" });
            });
        }
    };

    const uploadMedia = async (target, file, uploader) => {
        const fileToRequest = new FormData();
        fileToRequest.append("file", file);

        await fetch(`${url}/image`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: fileToRequest,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                target.setAttribute(
                    "src",
                    `${url}/unsecure/image/${result.generatedFilename}`
                );
                uploader.remove();
            });
    };

    const handleKeyDown = (e) => {
        const { detail, clientX, clientY, target } = e;
        const textTags = [
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "P",
            "LI",
            "BUTTON",
            "SPAN",
        ];
        const imageTags = ["IMG", "SVG"];
        const videoTags = ["VIDEO", "IFRAME"];
        e.preventDefault();

        if (
            textTags.includes(target.tagName) &&
            !target.classList.contains("play-btn") &&
            !target.classList.contains("upload-video__button")
        ) {
            if (
                clientY + 362 >= window.innerHeight ||
                clientX + 502 >= window.innerWidth
            ) {
                setEditParams({
                    topPos:
                        clientY + 362 <= window.innerHeight
                            ? clientY
                            : clientY - 362,
                    leftPos:
                        clientX + 502 <= window.innerWidth
                            ? clientX
                            : clientX - 502,
                    target: target,
                });
            } else {
                setEditParams({
                    topPos: clientY,
                    leftPos: clientX,
                    target: target,
                });
            }
        }

        if (
            target.tagName === "A" &&
            document.querySelector("main").contains(target)
        ) {
            setEditParams({
                topPos: clientY,
                leftPos: clientX,
                target: target,
                link: true,
            });
        }

        if (imageTags.includes(target.tagName)) {
            const sliders = document.querySelectorAll(".swiper-initialized");

            let isSlider;

            sliders.forEach((slider) => {
                if (slider && slider.contains(target)) {
                    isSlider = true;
                }
            });

            if (isSlider) {
                setUploaderTarget({
                    target: target,
                    type: "image",
                    slider: true,
                });
            } else {
                setUploaderTarget({
                    target: target,
                    type: "image",
                    slider: false,
                });
            }
        }

        const videoTag = Array.from(target.children).find((c) =>
            videoTags.includes(c.tagName)
        );

        if (videoTags.includes(target.tagName)) {
            setUploaderTarget({ target: target, type: "video" });
        }

        if (target.classList.contains("play-btn")) {
            setUploaderTarget({
                target: Array.from(target.parentElement.children).find((c) =>
                    videoTags.includes(c.tagName)
                ),
                type: "video",
            });
        }

        if (videoTag) {
            setUploaderTarget({ target: videoTag, type: "video" });
        }

        if (
            target.classList.contains("upload-video__button") ||
            target.classList.contains("play-btn")
        ) {
            setUploaderTarget({ target: target.parentElement, type: "video" });
        }

        if (target.parentElement.tagName === "MAIN") {
            console.log(e);
            setUploaderTarget({
                target: target,
                type: "image",
                direct: "adv",
                y: e.offsetY,
            });
        }
    };

    const handleMouseEnter = (event) => {
        const { target } = event;

        if (target.tagName !== "SECTION") {
            target.classList.add("focused");

            target.addEventListener("mouseleave", () => {
                target.classList.remove("focused");
            });
        }
    };

    useEffect(() => {
        // document.addEventListener('mousemove', handleMouseEnter);
        window.addEventListener("contextmenu", handleKeyDown);

        return () => {
            // document.removeEventListener('mousemove', handleMouseEnter);
            window.removeEventListener("contextmenu", handleKeyDown);
        };
    }, []);

    return (
        <AdminPagesControlContainer>
            {editParams && (
                <EditTextPanel
                    {...props}
                    {...editParams}
                    value={value}
                    setValue={setValue}
                    setEditParams={setEditParams}
                />
            )}
            {uploaderTarget && (
                <MediaUploader
                    {...props}
                    {...uploaderTarget}
                    setUploaderTarget={setUploaderTarget}
                />
            )}
        </AdminPagesControlContainer>
    );
};

const EditTextPanel = ({
    topPos,
    leftPos,
    value,
    innerWidth,
    setValue,
    target,
    link,
    setEditParams,
}) => {
    const [fontColorValue, setFontColor] = useState(null);
    const [fontWeightValue, setFontWeight] = useState(null);
    const [fontSizeValue, setFontSize] = useState(null);
    const [lineHeightValue, setLineHeight] = useState(null);
    const [targetText, setTargetText] = useState("");
    const [targetLink, setTargetLink] = useState("");
    const styles = window.getComputedStyle(target);

    const editPanelRef = useRef();

    useEffect(() => {
        const fontSizeLarge = styles.getPropertyValue("--lg-fs");
        const fontSizeMedium = styles.getPropertyValue("--md-fs");
        const fontSizeSmall = styles.getPropertyValue("--sm-fs");
        if (innerWidth > 1024) {
            setFontSize(+fontSizeLarge.replace(/px/gi, ""));
        } else if (innerWidth > 768 && innerWidth <= 1024) {
            setFontSize(+fontSizeMedium.replace(/px/gi, ""));
        } else {
            setFontSize(+fontSizeSmall.replace(/px/gi, ""));
        }

        const lineHeightLarge = styles.getPropertyValue("--lg-lh");
        const lineHeightMedium = styles.getPropertyValue("--md-lh");
        const lineHeightSmall = styles.getPropertyValue("--sm-lh");
        if (innerWidth > 1024) {
            setLineHeight(+lineHeightLarge.replace(/px/gi, ""));
        } else if (innerWidth > 768 && innerWidth <= 1024) {
            setLineHeight(+lineHeightMedium.replace(/px/gi, ""));
        } else {
            setLineHeight(+lineHeightSmall.replace(/px/gi, ""));
        }

        setFontWeight(styles.fontWeight);
        setFontColor(styles.color);
        setTargetText(target.innerText);
        setTargetLink(target.href);

        document.addEventListener("mousedown", (e) => handleClickOutside(e));
        return () => {
            setValue("");
            document.removeEventListener("mousedown", (e) =>
                handleClickOutside(e)
            );
        };
    }, [target, innerWidth]);

    const handleClickOutside = (e) => {
        if (editPanelRef.current && !editPanelRef.current.contains(e.target)) {
            setEditParams(null);
        }
    };

    const handleAddItemDropdown = () => {
        const id = generateId();
        const containerDropdown = target.parentElement.parentElement;
        const itemDropdown = target.parentElement.cloneNode(true);
        itemDropdown.setAttribute("data-id", id);
        containerDropdown.insertAdjacentHTML("beforeend", itemDropdown.outerHTML);
    };

    const handleRemoveItemDropdown = () => {
        target.parentElement.remove();
    }

    return (
        <EditTextPanelContainer
            style={{
                top: innerWidth > 768 ? topPos : "auto",
                bottom: innerWidth <= 768 ? 0 : "auto",
                left: innerWidth > 768 ? leftPos : 0,
            }}
            ref={editPanelRef}
        >
            {link && (
                <Input
                    type="text"
                    defaultValue={targetLink}
                    placeholder="Введите ссылку"
                    onChange={(e) => {
                        target.href = e.target.value;
                        if (target.href.includes(window.location.origin)) {
                            target.removeAttribute("target");
                        } else {
                            target.setAttribute("target", "_blank");
                        }
                    }}
                />
            )}
            {target.classList.contains("accordion-item-header") && (
                <div className="accordion__controls-btn">
                    <button onClick={handleAddItemDropdown}>
                        Добавить пункт
                    </button>
                    <button onClick={handleRemoveItemDropdown}>
                        Удалить пункт
                    </button>
                </div>
            )}
            <div className="edit-panel__header">
                <Input
                    type="color"
                    defaultValue={fontColorValue}
                    onChange={(e) => {
                        target.style.color = e.target.value;
                    }}
                />
                <Input
                    type="number"
                    defaultValue={fontWeightValue}
                    step="100"
                    min="100"
                    max="900"
                    onChange={(e) => (target.style.fontWeight = e.target.value)}
                />
                <Input
                    type="number"
                    defaultValue={fontSizeValue}
                    onChange={(e) =>
                        (target.style.fontSize = `${e.target.value}px`)
                    }
                />
                <Input
                    type="number"
                    defaultValue={lineHeightValue}
                    onChange={(e) =>
                        (target.style.lineHeight = `${e.target.value}px`)
                    }
                />
            </div>
            <textarea
                value={value ? value : targetText}
                onChange={(e) => {
                    setValue(e.target.value);
                    let button;
                    if (target.classList.contains("accordion-item-header")) {
                        button = Array.from(target.children)[0];
                    }

                    target.innerHTML = e.target.value;

                    if (button) {
                        target.append(button);
                    }
                }}
            />
            <Button primary onClick={() => setEditParams(null)}>
                Сохранить
            </Button>
        </EditTextPanelContainer>
    );
};
