import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Breadcrumbs } from "../../breadcrumbs/breadcrumbs";
import { AppLinks } from "../../AppLinks/AppLinks";

import { Instructions } from "../../instructions/instructions";
import {
    AdminNewsPageContentPosStyled,
    AdminNewsPageContentStyled,
    AdminNewsPageControlPanelStyled,
    AdminNewsPageDateStyled,
    AdminNewsPageStyled,
    AdminNewsPageTextareaStyled,
} from "./AdminNewsPage.style";
import Button from "../../Button/button";
import { ParagraphDtos } from "./components/ParagraphDtos";
import { SimpleListDtos } from "./components/SimpleListDtos";
import { ComplexListDtos } from "./components/ComplexListDtos";
import { SliderDtos } from "./components/SliderDtos";
import { useSelector } from "react-redux";
import { ImageDtos } from "./components/ImageDtos";
import { VideoDtos } from "./components/VideoDtos";
import { NotificationPopUp } from "../../NotificationPopUp/NotificationPopUp";
import { url } from "../AuthForm/AuthForm";

const photos = [
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
];

const instructionsList = [
    {
        text: "Откройте приложение Malanka New",
        path: "/images/charging/charging-1.png",
    },
    {
        text: "Отсканируйте QR-код",
        path: "/images/charging/charging-2.png",
    },
    {
        text: "Запустите процесс зарядки",
        path: "/images/charging/charging-3.png",
    },
];

const monthsArray = {
    rus: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ],
    eng: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    bel: [
        "студзеня",
        "лютага",
        "сакавіка",
        "красавіка",
        "траўня",
        "чэрвеня",
        "ліпеня",
        "жніўня",
        "верасня",
        "кастрычніка",
        "лістапада",
        "снежня",
    ],
};

const dateConverter = (lang) => {
    const date = new Date();
    const day = date.getDate();
    const month =
        lang === "RU"
            ? monthsArray.rus[date.getMonth()]
            : lang === "EN"
            ? monthsArray.eng[date.getMonth()]
            : monthsArray.bel[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
};

export const autosizeTextarea = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
};

export const AdminNewsPage = ({ innerWidth }) => {
    const [currentPos, setCurrentPos] = useState(1);
    const [templateRows, setTemplateRows] = useState([]);
    const [titleArticle, setTitleArticle] = useState("Заголовок новости");
    const [previewArticle, setPreviewArticle] = useState(
        "Подзаголовок новости"
    );
    const [currentNewsId, setCurrentNewsId] = useState(null);
    const [notification, setNotification] = useState(null);

    const [coverImage, setCoverImage] = useState("/images/news/news-6.jpg");
    const [singleImagePos, setSingleImagePos] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [sliderImagesPos, setSliderImagesPos] = useState(null);
    const [video, setVideo] = useState("");

    const [formDataCover, setFormDataCover] = useState(null);
    const [formDataImage, setFormDataImage] = useState(null);
    const [formDataSlider, setFormDataSlider] = useState([]);
    const [formDataVideo, setFormDataVideo] = useState(null);

    const { token } = useSelector((store) => store.authAdmin.userInfo);
    const { language } = useSelector((store) => store.localLanguage);

    const uploadCover = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        const fileToRequest = new FormData();
        fileToRequest.append("file", e.target.files[0]);

        reader.onload = () => {
            setCoverImage(reader.result);
            setFormDataCover(fileToRequest);
        };

        reader.readAsDataURL(file);
    };

    const uploadCoverToServer = async () => {
        await fetch(
            `${url}/article/image/${currentNewsId}?type=MAIN&position=0&horizontalPosition=0`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataCover,
            }
        );
    };

    const uploadImageToServer = async () => {
        await fetch(
            `${url}/article/image/${currentNewsId}?type=BANNER&position=${singleImagePos}&horizontalPosition=0`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataImage,
            }
        );
    };

    const uploadSliderImageToServer = async (data) => {
        await fetch(
            `${url}/article/image/${currentNewsId}?type=CAROUSEL&position=${sliderImagesPos}&horizontalPosition=0`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            }
        );
    };

    const uploadVideoToServer = async () => {
        await fetch(`${url}/article/video/${currentNewsId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formDataVideo,
        });
    };

    const handleCreateArticle = async (e) => {
        e.preventDefault();

        const data = {
            title: titleArticle,
            preview: previewArticle,
            marginBottom: 32,
            style: {
                size: 15,
                weight: "600",
                family: "Montserrat",
                alignment: "normal",
            },
        };

        const paragraph = templateRows.filter((item) => item.body);
        const simpleList = templateRows.filter((item) => item.simpleRows);
        const complexList = templateRows.filter(
            (item) => item.complexListPartDtos
        );

        if (paragraph.length) {
            data.paragraphDtos = paragraph;
        }

        if (simpleList.length) {
            data.simpleListDtos = simpleList;
        }

        if (complexList.length) {
            data.complexListDtos = complexList;
        }

        if (language === "RU") {
            await fetch(`${url}/article`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result && !result.error) {
                        setCurrentNewsId(result.id);
                        setNotification({
                            icon: "/images/svg/success-icon.svg",
                            description: "Новость создана",
                        });
                    }
                });
        } else {
            await fetch(
                `${url}/article?language=${
                    language === "EN" ? "ENG" : "BEL"
                }&originalVersionId=${currentNewsId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    if (result && !result.error) {
                        setNotification({
                            icon: "/images/svg/success-icon.svg",
                            description: "Новость создана",
                        });
                    }
                });
        }
    };

    const setTemplateParagraph = () => {
        const tempArray = [...templateRows];
        tempArray.push({
            position: currentPos,
            body:
                language === "RU"
                    ? `Пользователей в новом приложении ждет обновленный дизайн и улучшенная эргономика приложения. Теперь заряжаться и просматривать необходимую информацию о зарядной сессии стало ещё удобнее.`
                    : language === "EN"
                    ? "Users in the new application are waiting for an updated design and improved ergonomics of the application. Now charging and viewing the necessary information about the charging session has become even more convenient."
                    : "Карыстальнікаў у новым дадатку чакае абноўлены дызайн і палепшаная эрганоміка прыкладання. Зараз зараджацца і праглядаць неабходную інфармацыю аб зараднай сесіі стала яшчэ зручней.",
            style: {
                size: 18,
                weight: "400",
                alignment: "normal",
                marginBottom: 32,
                family: "Montserrat",
            },
        });
        setTemplateRows(tempArray);
        setCurrentPos(currentPos + 1);
    };

    const setTemplateList = (type) => {
        const tempArray = [...templateRows];
        tempArray.push({
            position: currentPos,
            title:
                language === "RU"
                    ? `Заголовок`
                    : language === "EN"
                    ? "Title"
                    : "Загаловак",
            listType: type,
            style: {
                size: 26,
                weight: "500",
                alignment: "normal",
                marginBottom: 32,
                family: "Montserrat",
            },
            simpleRows:
                language === "RU"
                    ? ["Строка списка 1", "Строка списка 2", "Строка списка 3"]
                    : language === "EN"
                    ? ["List line 1", "List line 2", "List line 3"]
                    : ["Радок спісу 1", "Радок спісу 2", "Радок спісу 3"],
        });

        setTemplateRows(tempArray);
        setCurrentPos(currentPos + 1);
    };

    const setTemplateComplexList = (type) => {
        const tempArray = [...templateRows];
        tempArray.push({
            position: currentPos,
            mainTitle:
                language === "RU"
                    ? `Заголовок`
                    : language === "EN"
                    ? "Title"
                    : "Загаловак",
            style: {
                size: 26,
                weight: "500",
                alignment: "normal",
                marginBottom: 32,
                family: "Montserrat",
            },
            complexListPartDtos: [
                {
                    title:
                        language === "RU"
                            ? `Пункт списка 1`
                            : language === "EN"
                            ? "List item 1"
                            : "Пункт спісу 1",
                    listType: "ORDERED",
                    style: {
                        size: 18,
                        weight: "400",
                        marginBottom: 32,
                        family: "Montserrat",
                        alignment: "normal",
                    },
                    complexRows:
                        language === "RU"
                            ? [
                                  "Подпункт списка 1",
                                  "Подпункт списка 2",
                                  "Подпункт списка 3",
                              ]
                            : language === "EN"
                            ? [
                                  "List subitem 1",
                                  "List subitem 2",
                                  "List subitem 3",
                              ]
                            : [
                                  "Падпункт спісу 1",
                                  "Падпункт спісу 2",
                                  "Падпункт спісу 3",
                              ],
                },
                {
                    title:
                        language === "RU"
                            ? `Пункт списка 2`
                            : language === "EN"
                            ? "List item 2"
                            : "Пункт спісу 2",
                    listType: "ORDERED",
                    style: {
                        size: 18,
                        weight: "400",
                        marginBottom: 32,
                        family: "Montserrat",
                        alignment: "normal",
                    },
                    complexRows:
                        language === "RU"
                            ? [
                                  "Подпункт списка 1",
                                  "Подпункт списка 2",
                                  "Подпункт списка 3",
                              ]
                            : language === "EN"
                            ? [
                                  "List subitem 1",
                                  "List subitem 2",
                                  "List subitem 3",
                              ]
                            : [
                                  "Падпункт спісу 1",
                                  "Падпункт спісу 2",
                                  "Падпункт спісу 3",
                              ],
                },
            ],
        });

        setTemplateRows(tempArray);
        setCurrentPos(currentPos + 1);
    };

    const setTemplateImage = () => {
        const tempArray = [...templateRows];
        tempArray.push({
            position: currentPos,
            imageLink: "/images/news/news-6.jpg",
        });

        setTemplateRows(tempArray);
        setCurrentPos(currentPos + 1);
        setSingleImagePos(currentPos);
    };

    const handleDelete = (key) => {
        const tempArray = templateRows
            .filter((el, j) => j !== key)
            .map((item, i) =>
                key <= i
                    ? { ...item, position: item.position - 1 }
                    : { ...item }
            );
        setTemplateRows(tempArray);
        setCurrentPos(currentPos - 1);
    };

    const handleReplaceRows = (pos, direction) => {
        let tempArray = [...templateRows];

        if (pos >= 1 && pos <= templateRows.length && templateRows.length > 1) {
            if (direction === "top" && pos !== 1) {
                tempArray = templateRows.map((item, i) => {
                    if (pos - 2 === i) {
                        return { ...templateRows[pos - 1], position: pos - 1 };
                    } else if (pos - 1 === i) {
                        return { ...templateRows[pos - 2], position: pos };
                    } else {
                        return { ...item };
                    }
                });
            } else if (direction === "bottom" && pos !== templateRows.length) {
                tempArray = templateRows.map((item, i) => {
                    if (pos - 1 === i) {
                        return { ...templateRows[pos], position: pos };
                    } else if (pos === i) {
                        return { ...templateRows[pos - 1], position: pos + 1 };
                    } else {
                        return { ...item };
                    }
                });
            }
        }

        setTemplateRows(tempArray);
    };

    const uploadAllMediaToServer = () => {
        formDataCover && uploadCoverToServer();
        formDataImage && uploadImageToServer();
        formDataSlider.length > 0 &&
            formDataSlider.forEach((slide) => {
                uploadSliderImageToServer(slide);
            });
        formDataVideo && uploadVideoToServer();

        setNotification({
            icon: "/images/svg/success-icon.svg",
            description: "Медиа файлы успешно привязаны",
        });
    };

    return (
        <AdminNewsPageStyled onSubmit={handleCreateArticle}>
            <section className="news-page__title mb-32">
                <div
                    className={`news-page__cover mb-16 ${
                        formDataCover ? "" : "plug"
                    }`}
                >
                    <label>
                        <img src={coverImage} alt="news-cover" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadCover}
                        />
                    </label>
                </div>
                <Breadcrumbs
                    link={{ name: "Новости", path: "news" }}
                    currentPage={titleArticle}
                />
            </section>
            <AdminNewsPageContentStyled>
                <div>
                    <AdminNewsPageDateStyled>
                        {dateConverter(language)}
                    </AdminNewsPageDateStyled>
                    <AdminNewsPageTextareaStyled
                        type="text"
                        value={titleArticle}
                        name="title"
                        className="h2 mb-16"
                        rows={1}
                        onInput={autosizeTextarea}
                        onChange={(e) => setTitleArticle(e.target.value)}
                    />
                    <AdminNewsPageTextareaStyled
                        type="text"
                        className="mb-16"
                        value={previewArticle}
                        name="subtitle"
                        weight={"500"}
                        size={26}
                        rows={1}
                        onInput={autosizeTextarea}
                        onChange={(e) => setPreviewArticle(e.target.value)}
                    />
                    <AppLinks />
                </div>
                <AdminNewsPageContentPosStyled>
                    {templateRows.map((item, i) => {
                        if (
                            item.body &&
                            !item.style.family.includes("video") &&
                            !item.style.family.includes("slider")
                        ) {
                            return (
                                <ParagraphDtos
                                    item={item}
                                    i={i}
                                    templateRows={templateRows}
                                    setTemplateRows={setTemplateRows}
                                    handleReplaceRows={handleReplaceRows}
                                    handleDelete={handleDelete}
                                    setFormDataSlider={setFormDataSlider}
                                    setFormDataVideo={setFormDataVideo}
                                    setSliderImagesPos={setSliderImagesPos}
                                    key={i}
                                />
                            );
                        }

                        if (item.simpleRows) {
                            return (
                                <SimpleListDtos
                                    item={item}
                                    i={i}
                                    templateRows={templateRows}
                                    setTemplateRows={setTemplateRows}
                                    handleReplaceRows={handleReplaceRows}
                                    handleDelete={handleDelete}
                                    key={i}
                                />
                            );
                        }

                        if (item.complexListPartDtos) {
                            return (
                                <ComplexListDtos
                                    item={item}
                                    i={i}
                                    templateRows={templateRows}
                                    setTemplateRows={setTemplateRows}
                                    handleReplaceRows={handleReplaceRows}
                                    handleDelete={handleDelete}
                                    key={i}
                                />
                            );
                        }

                        if (item.style && item.style.family === "slider-desc") {
                            return (
                                <SliderDtos
                                    item={item}
                                    i={i}
                                    sliderImages={sliderImages}
                                    templateRows={templateRows}
                                    setTemplateRows={setTemplateRows}
                                    formDataSlider={formDataSlider}
                                    setFormDataSlider={setFormDataSlider}
                                    setSliderImages={setSliderImages}
                                    setSingleImagePos={setSingleImagePos}
                                    handleReplaceRows={handleReplaceRows}
                                    handleDelete={handleDelete}
                                    innerWidth={innerWidth}
                                    key={i}
                                />
                            );
                        }

                        if (item.imageLink) {
                            return (
                                <ImageDtos
                                    position={item.position}
                                    image={item.imageLink}
                                    i={i}
                                    templateRows={templateRows}
                                    formDataImage={formDataImage}
                                    setTemplateRows={setTemplateRows}
                                    setSingleImagePos={setSingleImagePos}
                                    handleReplaceRows={handleReplaceRows}
                                    setFormDataImage={setFormDataImage}
                                    handleDelete={handleDelete}
                                    key={i}
                                />
                            );
                        }

                        if (item.style && item.style.family === "video-title") {
                            return (
                                <div
                                    style={{
                                        gridRow: item.position,
                                        marginBottom: 32,
                                    }}
                                >
                                    <ParagraphDtos
                                        item={item}
                                        i={i}
                                        templateRows={templateRows}
                                        setTemplateRows={setTemplateRows}
                                        handleReplaceRows={handleReplaceRows}
                                        handleDelete={handleDelete}
                                        setFormDataVideo={setFormDataVideo}
                                        key={i}
                                    />
                                    <VideoDtos
                                        item={item}
                                        i={i}
                                        video={video}
                                        formDataVideo={formDataVideo}
                                        setFormDataVideo={setFormDataVideo}
                                        setTemplateRows={setTemplateRows}
                                        setVideo={setVideo}
                                        key={i}
                                    />
                                </div>
                            );
                        }
                    })}
                    <AdminNewsPageControlPanelStyled
                        justify="space-between"
                        row={currentPos + 1}
                    >
                        <button
                            type="button"
                            data-value="paragraph"
                            disabled={currentNewsId}
                            onClick={setTemplateParagraph}
                        >
                            Абзац
                        </button>
                        <button
                            type="button"
                            data-value="unordered"
                            disabled={currentNewsId}
                            onClick={() => setTemplateList("UNORDERED")}
                        >
                            Маркированный список
                        </button>
                        <button
                            type="button"
                            data-value="ordered"
                            disabled={currentNewsId}
                            onClick={() => setTemplateList("ORDERED")}
                        >
                            Нумерованный список
                        </button>
                        <button
                            type="button"
                            data-value="complex"
                            disabled={currentNewsId}
                            onClick={setTemplateComplexList}
                        >
                            Комбинированный список
                        </button>
                        <button
                            type="button"
                            data-value="image"
                            disabled={currentNewsId}
                            onClick={setTemplateImage}
                        >
                            Изображение
                        </button>
                    </AdminNewsPageControlPanelStyled>
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            margin: "32px auto 0",
                            gridRow: currentPos + 2,
                        }}
                    >
                        <Button primary disabled={currentNewsId}>
                            Добавить новость
                        </Button>
                        <Button
                            type="button"
                            primary
                            disabled={!currentNewsId}
                            onClick={uploadAllMediaToServer}
                        >
                            Загрузить медиа
                        </Button>
                    </div>
                </AdminNewsPageContentPosStyled>
            </AdminNewsPageContentStyled>
            {notification && (
                <NotificationPopUp
                    {...notification}
                    onClick={() => setNotification(null)}
                />
            )}
        </AdminNewsPageStyled>
    );
};
