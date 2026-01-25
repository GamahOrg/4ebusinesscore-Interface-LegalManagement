import { Col, Container, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
export default function FlowUpEditLasuit() {
  const intl = useIntl();
  return (
    <div>
      <h1 className="me-10 mb-5"> {intl.formatMessage({ id: "Sessions" })}</h1>
      <Container className="bg-light rounded w-95 pb-7">
        <Row>
          <Col className="pt-6 ps-2 " lg={12}>
            <h3>{intl.formatMessage({ id: "Session1" })}</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="h-auto mt-5">
            <Form.Group controlId="caseNumberInput">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "SessionDate" })}
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type="date"
                  className="bg-white"
                  placeholder={intl.formatMessage({ id: "SessionDate" })}
                />
              </div>
            </Form.Group>
          </Col>
          <Col lg={4} className="h-auto mt-5">
            <Form.Group controlId="caseDaySelect">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "SessionDay" })}
              </Form.Label>
              <div className="input-group">
                <select className="form-select bg-white">
                  <option value="sunday">
                    {intl.formatMessage({ id: "Sunday" })}
                  </option>
                  <option value="monday">
                    {intl.formatMessage({ id: "Monday" })}
                  </option>
                  <option value="tuesday">
                    {intl.formatMessage({ id: "Tuesday" })}
                  </option>
                  <option value="wednesday">
                    {intl.formatMessage({ id: "Wednesday" })}
                  </option>
                  <option value="thursday">
                    {intl.formatMessage({ id: "Thursday" })}
                  </option>
                  <option value="friday">
                    {intl.formatMessage({ id: "Friday" })}
                  </option>
                  <option value="saturday">
                    {intl.formatMessage({ id: "Saturday" })}
                  </option>
                </select>
              </div>
            </Form.Group>
          </Col>

          <Col lg={4} className="h-auto mt-5">
            <Form.Group controlId="caseNumberInput">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "SessionTime" })}
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type="time"
                  className="bg-white"
                  placeholder={intl.formatMessage({ id: "SessionTime" })}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={12}>
            <p className="fs-5 text-grey ms-2">
              {intl.formatMessage({ id: "ReplyNote" })}
            </p>
            <textarea className="custom-textarea w-100 rounded" />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <p className="fs-5 text-grey ms-2 mt-4 mb-0">
              {intl.formatMessage({ id: "ATTACHMENTS" })}
            </p>
            <div className="d-flex align-items-center mt-0">
              <div className="w-100 py-5 mx-auto">
                <div className="notice bg-light-primary rounded border border-primary border-dashed mb-1">
                  <label
                    htmlFor="outputAttachment"
                    className="form-label px-2 fontSz-6 my-5 w-100 uploadFile-style inputAreaHeight d-flex justify-content-center align-items-center text-primary"
                  >
                    <i className="fas fa-paperclip mx-2"></i>
                    {intl.formatMessage({ id: "AttachDocument" })}
                  </label>
                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    id="outputAttachment"
                    name="attachments"
                    className="d-none"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={12}>
            <p className="fs-5 text-grey ms-1">
              {intl.formatMessage({ id: "SessionPrompts" })}
            </p>
            <input
              type="text"
              className="custom-input w-100 mt-2"
              placeholder={`${intl.formatMessage({ id: "SessionPrompts" })}`}
            />
            <p className="my-3 text-success">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="ms-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_58_5864)">
                  <mask id="path-1-inside-1_58_5864" fill="white">
                    <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z" />
                  </mask>
                  <path
                    d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z"
                    fill="#4CBA5D"
                  />
                  <path
                    d="M8 0L8.02308 -21.3333L8.01154 -21.3333H8V0ZM16 8H37.3333V7.98846L37.3333 7.97693L16 8ZM8 14.6667V36H8.01172L8.02343 36L8 14.6667ZM14.6667 8L36 8.02343L36 8.01171V8H14.6667ZM8 -21.3333C2.19842 -21.3333 -3.47288 -19.613 -8.29672 -16.3898L15.4076 19.0863C13.215 20.5513 10.6371 21.3333 8 21.3333V-21.3333ZM-8.29672 -16.3898C-13.1206 -13.1666 -16.8803 -8.58534 -19.1005 -3.22538L20.3184 13.1024C19.3092 15.5388 17.6003 17.6212 15.4076 19.0863L-8.29672 -16.3898ZM-19.1005 -3.22538C-21.3206 2.13459 -21.9015 8.03254 -20.7697 13.7226L21.0771 5.3988C21.5916 7.98521 21.3276 10.6661 20.3184 13.1024L-19.1005 -3.22538ZM-20.7697 13.7226C-19.6379 19.4128 -16.8441 24.6395 -12.7418 28.7418L17.4281 -1.42809C19.2928 0.436611 20.5627 2.81238 21.0771 5.3988L-20.7697 13.7226ZM-12.7418 28.7418C-8.63945 32.8441 -3.41275 35.6379 2.27735 36.7697L10.6012 -5.07714C13.1876 -4.56267 15.5634 -3.29279 17.4281 -1.42809L-12.7418 28.7418ZM2.27735 36.7697C7.96746 37.9015 13.8654 37.3206 19.2254 35.1005L2.89756 -4.31839C5.33391 -5.32756 8.0148 -5.59161 10.6012 -5.07714L2.27735 36.7697ZM19.2254 35.1005C24.5853 32.8803 29.1666 29.1206 32.3898 24.2967L-3.08626 0.592399C-1.62117 -1.60026 0.461212 -3.30923 2.89756 -4.31839L19.2254 35.1005ZM32.3898 24.2967C35.613 19.4729 37.3333 13.8016 37.3333 8H-5.33333C-5.33333 5.36291 -4.55134 2.78505 -3.08626 0.592399L32.3898 24.2967ZM37.3333 7.97693C37.3249 0.20595 34.2342 -7.24435 28.7393 -12.7393L-1.43062 17.4306C-3.92595 14.9353 -5.3295 11.552 -5.33332 8.02307L37.3333 7.97693ZM28.7393 -12.7393C23.2444 -18.2342 15.7941 -21.3249 8.02308 -21.3333L7.97693 21.3333C4.44801 21.3295 1.06471 19.926 -1.43062 17.4306L28.7393 -12.7393ZM8 -6.66667C10.9008 -6.66667 13.7365 -5.80648 16.1484 -4.19489L-7.55596 31.2812C-2.95139 34.3578 2.46212 36 8 36V-6.66667ZM16.1484 -4.19489C18.5603 -2.58329 20.4402 -0.292675 21.5502 2.38731L-17.8686 18.7151C-15.7494 23.8315 -12.1605 28.2045 -7.55596 31.2812L16.1484 -4.19489ZM21.5502 2.38731C22.6603 5.06729 22.9508 8.01627 22.3849 10.8613L-19.462 2.53747C-20.5424 7.96894 -19.9879 13.5988 -17.8686 18.7151L21.5502 2.38731ZM22.3849 10.8613C21.8189 13.7064 20.4221 16.3197 18.3709 18.3709L-11.799 -11.799C-15.7149 -7.88312 -18.3816 -2.89399 -19.462 2.53747L22.3849 10.8613ZM18.3709 18.3709C16.3197 20.4221 13.7064 21.8189 10.8613 22.3849L2.53747 -19.462C-2.89399 -18.3816 -7.88311 -15.7149 -11.799 -11.799L18.3709 18.3709ZM10.8613 22.3849C8.01627 22.9508 5.0673 22.6603 2.38731 21.5502L18.7151 -17.8686C13.5988 -19.9879 7.96894 -20.5424 2.53747 -19.462L10.8613 22.3849ZM2.38731 21.5502C-0.292675 20.4401 -2.58329 18.5603 -4.19488 16.1484L31.2812 -7.55597C28.2045 -12.1605 23.8315 -15.7494 18.7151 -17.8686L2.38731 21.5502ZM-4.19488 16.1484C-5.80648 13.7364 -6.66666 10.9008 -6.66666 8H36C36 2.46212 34.3578 -2.95139 31.2812 -7.55597L-4.19488 16.1484ZM-6.66665 7.97657C-6.66239 4.09426 -5.11825 0.372172 -2.37304 -2.37304L27.7969 27.7968C33.0417 22.552 35.9918 15.4408 36 8.02343L-6.66665 7.97657ZM-2.37304 -2.37304C0.372173 -5.11826 4.09426 -6.66239 7.97658 -6.66665L8.02343 36C15.4408 35.9918 22.552 33.0417 27.7969 27.7968L-2.37304 -2.37304Z"
                    fill="#4CBA5D"
                    mask="url(#path-1-inside-1_58_5864)"
                  />
                  <path
                    d="M8 6.6665H7.33333C7.15652 6.6665 6.98695 6.73674 6.86193 6.86177C6.7369 6.98679 6.66667 7.15636 6.66667 7.33317C6.66667 7.50998 6.7369 7.67955 6.86193 7.80458C6.98695 7.9296 7.15652 7.99984 7.33333 7.99984H8V11.9998C8 12.1766 8.07024 12.3462 8.19526 12.4712C8.32029 12.5963 8.48985 12.6665 8.66667 12.6665C8.84348 12.6665 9.01305 12.5963 9.13807 12.4712C9.26309 12.3462 9.33333 12.1766 9.33333 11.9998V7.99984C9.33333 7.64622 9.19286 7.30708 8.94281 7.05703C8.69276 6.80698 8.35362 6.6665 8 6.6665Z"
                    fill="#4CBA5D"
                  />
                  <path
                    d="M8 5.3335C8.55228 5.3335 9 4.88578 9 4.3335C9 3.78121 8.55228 3.3335 8 3.3335C7.44772 3.3335 7 3.78121 7 4.3335C7 4.88578 7.44772 5.3335 8 5.3335Z"
                    fill="#4CBA5D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_58_5864">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {intl.formatMessage({
                id: "TheDetailsOfTheSessionWillBeAddedWhenTheTimeComes",
              })}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
