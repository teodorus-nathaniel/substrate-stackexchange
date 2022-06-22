import { WalletSelect } from "@talisman-connect/components";
import Button from "./Button";

type Props = {};

export default function ConnectWalletButton({}: Props) {
  return (
    <WalletSelect
      dappName="Substrate StackExchange"
      onWalletSelected={(wallet) => {
        console.log(wallet);
      }}
      triggerComponent={<Button>Connect to wallet</Button>}
    />
  );
}
