import React from "react";
import { Button } from "reactstrap";
import "../libs/styles/LoaderButton.css";
export default ({
isLoading,
text,
loadingText,
className = "",
disabled = false,
...props
}) =>
<Button className={'LoaderButton ${className}'} disabled={disabled || isLoading} {...props}>
{isLoading }
{!isLoading ? text : loadingText}
</Button>;
