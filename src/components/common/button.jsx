import { Button } from "@nextui-org/react";

export default function CommonButton(props) {
  const title = props.buttonTitle || "Click me";
  return (
    <Button color="primary" {...props}>
      {title}
    </Button>
  );
}
