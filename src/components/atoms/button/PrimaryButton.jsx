import { Button } from "@chakra-ui/react";
import { memo } from "react";

export const PrimaryButton = memo((props) => {
  const {
    children,
    disabled = false,
    loading = false,
    w,
    bg,
    color,
    icon,
    onClick,
  } = props;
  return (
    <Button
      w={w}
      bg={bg}
      color={color}
      _hover={{ opacity: 0.8 }}
      leftIcon={icon}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
