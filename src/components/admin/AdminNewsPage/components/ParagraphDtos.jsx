import { autosizeTextarea } from "../AdminNewsPage";
import {
    AdminNewsPageTextareaStyled,
    ContentEditControlContainerStyled,
    ContentEditControlStyled,
} from "../AdminNewsPage.style";

export const ParagraphDtos = ({
    item,
    i,
    templateRows,
    setTemplateRows,
    handleReplaceRows,
    handleDelete,
    setFormDataVideo,
    setFormDataSlider,
    setSliderImagesPos,
}) => {
    return (
        <ContentEditControlContainerStyled
            row={item.position}
            marginBottom={item.style.marginBottom}
        >
            <ContentEditControlStyled justify="flex-end" gap={32}>
                <button
                    type="button"
                    onClick={() => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? item.style.family === "slider-desc"
                                    ? {
                                          ...item,
                                          style: {
                                              ...item.style,
                                              family: "",
                                          },
                                      }
                                    : {
                                          ...item,
                                          style: {
                                              ...item.style,
                                              family: "slider-desc",
                                          },
                                      }
                                : { ...item }
                        );

                        if (item.style.family === "slider-desc") {
                            setFormDataSlider(null);
                            setSliderImagesPos(null);
                        } else {
                            setSliderImagesPos(item.position);
                        }

                        setTemplateRows(tempArray);
                    }}
                >
                    {item.style.family === "slider-desc"
                        ? "Отвязать от слайдера"
                        : "Привязать к слайдеру"}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? item.style.family === "video-title"
                                    ? {
                                          ...item,
                                          style: {
                                              ...item.style,
                                              family: "",
                                          },
                                      }
                                    : {
                                          ...item,
                                          style: {
                                              ...item.style,
                                              family: "video-title",
                                          },
                                      }
                                : { ...item }
                        );

                        if (item.style.family === "video-title") {
                            setFormDataVideo(null);
                        }

                        setTemplateRows(tempArray);
                    }}
                >
                    {item.style.family === "video-title"
                        ? "Отвязать от видео"
                        : "Привязать к видео"}
                </button>
                <label>
                    Отступ
                    <input
                        type="number"
                        value={item.style.marginBottom}
                        step={1}
                        min={1}
                        onChange={(e) => {
                            const tempArray = templateRows.map((item, j) =>
                                i === j
                                    ? {
                                          ...item,
                                          style: {
                                              ...item.style,
                                              marginBottom: e.target.value,
                                          },
                                      }
                                    : { ...item }
                            );

                            setTemplateRows(tempArray);
                        }}
                    />
                </label>
                <select
                    onChange={(e) => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? {
                                      ...item,
                                      style: {
                                          ...item.style,
                                          alignment: e.target.value,
                                      },
                                  }
                                : { ...item }
                        );

                        setTemplateRows(tempArray);
                    }}
                >
                    <option value="normal">обычный</option>
                    <option value="italic">курсив</option>
                </select>
                <input
                    type="number"
                    value={item.style.weight}
                    step={100}
                    min={100}
                    max={900}
                    onChange={(e) => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? {
                                      ...item,
                                      style: {
                                          ...item.style,
                                          weight: e.target.value,
                                      },
                                  }
                                : { ...item }
                        );

                        setTemplateRows(tempArray);
                    }}
                />
                <input
                    type="number"
                    value={item.style.size}
                    step={1}
                    min={1}
                    onChange={(e) => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? {
                                      ...item,
                                      style: {
                                          ...item.style,
                                          size: e.target.value,
                                      },
                                  }
                                : { ...item }
                        );

                        setTemplateRows(tempArray);
                    }}
                />
                <button
                    type="button"
                    onClick={() => handleReplaceRows(item.position, "top")}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.92 15.05L13.4 8.53001C12.63 7.76001 11.37 7.76001 10.6 8.53001L4.07999 15.05"
                            stroke="black"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => handleReplaceRows(item.position, "bottom")}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07999 8.95001"
                            stroke="black"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button type="button" onClick={() => handleDelete(i)}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.5 5V22H19.5V5H4.5Z"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 10V16.5"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 10V16.5"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2 5H22"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 5L9.6445 2H14.3885L16 5H8Z"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </ContentEditControlStyled>
            <AdminNewsPageTextareaStyled
                size={item.style.size}
                weight={item.style.weight}
                fontStyle={item.style.alignment}
                value={item.body}
                onInput={autosizeTextarea}
                onChange={(e) => {
                    const tempArray = templateRows.map((item, j) =>
                        i === j
                            ? {
                                  ...item,
                                  body: e.target.value,
                              }
                            : { ...item }
                    );

                    setTemplateRows(tempArray);
                }}
                key={i}
            />
        </ContentEditControlContainerStyled>
    );
};
