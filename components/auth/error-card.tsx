import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Παλι μαλακια εκανες ρε φιλε"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      showSocial
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
