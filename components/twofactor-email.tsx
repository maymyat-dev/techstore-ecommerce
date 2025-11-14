import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface TwoFactorEmailProps {
  validationCode?: string;
}



export const TwoFactorEmail = ({ validationCode }: TwoFactorEmailProps) => (
  <Html>
    <Head />
        <Tailwind>
            <Body className="bg-white font-linear">
      <Preview>Your Two Factor Authentication Code</Preview>
      <Container className="mx-auto my-0 max-w-[560px] px-0 pt-5 pb-12">

        <Heading className="text-[24px] tracking-[-0.5px] leading-[1.3] font-normal text-[#484848] pt-[17px] px-0 pb-0">
          Your Two Factor Authentication Code
        </Heading>
        <Section className="py-[27px] px-0">
          <Button
            className="bg-[#5e6ad2] rounded font-semibold text-white text-[15px] no-underline text-center block py-[11px] px-[23px]"
            href={"/auth/login"}
          >
            Login
          </Button>
        </Section>
        <Text className="mb-[15px] mx-0 mt-0 leading-[1.4] text-[15px] text-[#3c4149]">
          Enter it in the OTP and press the verify button. This code will only
          be valid for the next 15 minutes.
        </Text>
        <code className="font-mono font-bold px-1 py-px bg-[#dfe1e4] text-[#3c4149] text-[21px] tracking-[-0.3px] rounded">
          {validationCode}
        </code>
        <Hr className="border-[#dfe1e4] mt-[42px] mb-[26px]" />
      </Container>
    </Body>
    </Tailwind>
  </Html>
);

// TwoFactorEmail.PreviewProps = {
//   validationCode: "tt226-5398x",
// } as TwoFactorEmailProps;

export default TwoFactorEmail;
