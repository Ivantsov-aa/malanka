import {
    ContentEditControlContainerStyled,
    ContentEditControlStyled,
} from "../AdminNewsPage.style";

export const ImageDtos = ({
    position,
    i,
    image,
    setSingleImagePos,
    templateRows,
    setTemplateRows,
    formDataImage,
    setFormDataImage,
    handleReplaceRows,
    handleDelete,
}) => {
    const uploadBanner = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        const fileToRequest = new FormData();
        fileToRequest.append("file", e.target.files[0]);

        reader.onload = () => {
            const tempArray = templateRows.map((item, j) =>
                item.imageLink
                    ? {
                          ...item,
                          imageLink: reader.result,
                      }
                    : { ...item }
            );

            setTemplateRows(tempArray);
            setFormDataImage(fileToRequest);
        };

        reader.readAsDataURL(file);
    };

    return (
        <ContentEditControlContainerStyled
            className={`news-page__cover mb-16 ${formDataImage ? "" : "plug"}`}
            row={position}
            marginBottom={32}
        >
            <ContentEditControlStyled justify="flex-end" gap={32}>
                <button
                    type="button"
                    onClick={() => {
                        handleReplaceRows(position, "top");
                        setSingleImagePos(position - 1);
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
                    onClick={() => {
                        handleReplaceRows(position, "bottom");
                        setSingleImagePos(position + 1);
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
                            d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07999 8.95001"
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
                    onClick={() => {
                        setFormDataImage(null);
                        setSingleImagePos(null);
                        handleDelete(i);
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
            <label>
                <img
                    src={image}
                    alt="news-cover"
                    style={{
                        width: "100%",
                        height: "660px",
                    }}
                />
                <input type="file" accept="image/*" onChange={uploadBanner} />
            </label>
        </ContentEditControlContainerStyled>
    );
};
