import { autosizeTextarea } from "../AdminNewsPage";
import {
    AddDeleteBtnsContainerStyled,
    AddListElementButtonStyled,
    AdminNewsPageTextareaStyled,
    ContentEditControlContainerStyled,
    ContentEditControlStyled,
    DeleteListElementButtonStyled,
} from "../AdminNewsPage.style";

export const ComplexListDtos = ({
    item,
    i,
    templateRows,
    setTemplateRows,
    handleReplaceRows,
    handleDelete,
}) => {
    return (
        <ContentEditControlContainerStyled
            row={item.position}
            marginBottom={item.style.marginBottom}
        >
            <ContentEditControlStyled justify="flex-end" gap={32}>
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
                type="text"
                className="h4 medium"
                size={item.style.size}
                weight={item.style.weight}
                fontStyle={item.style.alignment}
                value={item.mainTitle}
                rows={1}
                onInput={autosizeTextarea}
                onChange={(e) => {
                    const tempArray = templateRows.map((item, j) =>
                        i === j
                            ? {
                                  ...item,
                                  mainTitle: e.target.value,
                              }
                            : { ...item }
                    );

                    setTemplateRows(tempArray);
                }}
            />
            <ol className="complex-list">
                {item.complexListPartDtos.map((subtitle, j) => (
                    <div key={j}>
                        <li className="regular-text">
                            <AddDeleteBtnsContainerStyled>
                                <AddListElementButtonStyled
                                    type="button"
                                    onClick={() => {
                                        const temp = item.complexListPartDtos;
                                        temp.splice(j + 1, 0, subtitle);
                                        const tempArray = templateRows.map(
                                            (row, d) =>
                                                i === d
                                                    ? {
                                                          ...row,
                                                          complexListPartDtos:
                                                              temp,
                                                      }
                                                    : { ...row }
                                        );

                                        setTemplateRows(tempArray);
                                    }}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                                            stroke="#6FBE6E"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 8V16"
                                            stroke="#6FBE6E"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8 12H16"
                                            stroke="#6FBE6E"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </AddListElementButtonStyled>
                                <DeleteListElementButtonStyled
                                    type="button"
                                    onClick={() => {
                                        const tempArray = templateRows.map(
                                            (row, d) =>
                                                i === d
                                                    ? {
                                                          ...row,
                                                          complexListPartDtos:
                                                              row.complexListPartDtos.filter(
                                                                  (el, z) =>
                                                                      z !== j
                                                              ),
                                                      }
                                                    : { ...row }
                                        );

                                        setTemplateRows(tempArray);
                                    }}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.5 5V22H19.5V5H4.5Z"
                                            stroke="#FC978C"
                                            strokeWidth="3"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10 10V16.5"
                                            stroke="#FC978C"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14 10V16.5"
                                            stroke="#FC978C"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M2 5H22"
                                            stroke="#FC978C"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8 5L9.6445 2H14.3885L16 5H8Z"
                                            stroke="#FC978C"
                                            strokeWidth="3"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </DeleteListElementButtonStyled>
                            </AddDeleteBtnsContainerStyled>
                            <AdminNewsPageTextareaStyled
                                size={18}
                                weight={400}
                                fontStyle={"normal"}
                                value={subtitle.title}
                                rows={1}
                                onInput={autosizeTextarea}
                                onChange={(e) => {
                                    const tempArray = templateRows.map(
                                        (sub, b) =>
                                            i === b
                                                ? {
                                                      ...sub,
                                                      complexListPartDtos:
                                                          sub.complexListPartDtos.map(
                                                              (el, z) =>
                                                                  z === j
                                                                      ? {
                                                                            ...el,
                                                                            title: e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                      : {
                                                                            ...el,
                                                                        }
                                                          ),
                                                  }
                                                : { ...sub }
                                    );

                                    setTemplateRows(tempArray);
                                }}
                            />
                        </li>
                        <ul>
                            {subtitle.complexRows.map((row, k) => (
                                <li key={k}>
                                    <AddDeleteBtnsContainerStyled>
                                        <AddListElementButtonStyled
                                            type="button"
                                            onClick={() => {
                                                const temp =
                                                    subtitle.complexRows;
                                                temp.splice(k + 1, 0, row);
                                                const tempArray =
                                                    templateRows.map(
                                                        (elem, d) =>
                                                            i === d
                                                                ? {
                                                                      ...elem,
                                                                      complexListPartDtos:
                                                                          elem.complexListPartDtos.map(
                                                                              (
                                                                                  el,
                                                                                  e
                                                                              ) =>
                                                                                  e ===
                                                                                  k
                                                                                      ? {
                                                                                            ...el,
                                                                                            complexRows:
                                                                                                temp,
                                                                                        }
                                                                                      : {
                                                                                            ...el,
                                                                                        }
                                                                          ),
                                                                  }
                                                                : { ...elem }
                                                    );

                                                setTemplateRows(tempArray);
                                            }}
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                                                    stroke="#6FBE6E"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 8V16"
                                                    stroke="#6FBE6E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M8 12H16"
                                                    stroke="#6FBE6E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </AddListElementButtonStyled>
                                        <DeleteListElementButtonStyled
                                            type="button"
                                            onClick={() => {
                                                const tempArray =
                                                    templateRows.map(
                                                        (elem, d) =>
                                                            i === d
                                                                ? {
                                                                      ...elem,
                                                                      complexListPartDtos:
                                                                          elem.complexListPartDtos.map(
                                                                              (
                                                                                  el,
                                                                                  e
                                                                              ) =>
                                                                                  e ===
                                                                                  j
                                                                                      ? {
                                                                                            ...el,
                                                                                            complexRows:
                                                                                                el.complexRows.filter(
                                                                                                    (
                                                                                                        m,
                                                                                                        f
                                                                                                    ) =>
                                                                                                        k !==
                                                                                                        f
                                                                                                ),
                                                                                        }
                                                                                      : {
                                                                                            ...el,
                                                                                        }
                                                                          ),
                                                                  }
                                                                : { ...elem }
                                                    );

                                                setTemplateRows(tempArray);
                                            }}
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.5 5V22H19.5V5H4.5Z"
                                                    stroke="#FC978C"
                                                    strokeWidth="3"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M10 10V16.5"
                                                    stroke="#FC978C"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M14 10V16.5"
                                                    stroke="#FC978C"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M2 5H22"
                                                    stroke="#FC978C"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M8 5L9.6445 2H14.3885L16 5H8Z"
                                                    stroke="#FC978C"
                                                    strokeWidth="3"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </DeleteListElementButtonStyled>
                                    </AddDeleteBtnsContainerStyled>
                                    <AdminNewsPageTextareaStyled
                                        size={18}
                                        weight={400}
                                        fontStyle={"normal"}
                                        value={row}
                                        rows={1}
                                        onInput={autosizeTextarea}
                                        onChange={(e) => {
                                            const tempArray = templateRows.map(
                                                (sub, b) =>
                                                    i === b
                                                        ? {
                                                              ...sub,
                                                              complexListPartDtos:
                                                                  sub.complexListPartDtos.map(
                                                                      (el, z) =>
                                                                          z ===
                                                                          j
                                                                              ? {
                                                                                    ...el,
                                                                                    complexRows:
                                                                                        el.complexRows.map(
                                                                                            (
                                                                                                val,
                                                                                                c
                                                                                            ) =>
                                                                                                c ===
                                                                                                k
                                                                                                    ? e
                                                                                                          .target
                                                                                                          .value
                                                                                                    : val
                                                                                        ),
                                                                                }
                                                                              : {
                                                                                    ...el,
                                                                                }
                                                                  ),
                                                          }
                                                        : { ...sub }
                                            );

                                            setTemplateRows(tempArray);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ol>
        </ContentEditControlContainerStyled>
    );
};
