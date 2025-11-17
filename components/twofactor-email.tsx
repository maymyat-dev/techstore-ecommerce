import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ShoppingBag } from "lucide-react";

interface TwoFactorEmailProps {
  validationCode?: string;
  loginLink?: string;
}

export const TwoFactorEmail = ({
  validationCode,
  loginLink,
}: TwoFactorEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your Two Factor Authentication Code</Preview>
      <Container style={container}>
        <ShoppingBag size={32} style={logo} />
        <Text style={paragraph}>Hi there,</Text>
        <Text style={paragraph}>
          Enter it in the OTP and press the verify button. This code will only
          be valid for the next 15 minutes.
        </Text>
        <Section style={codeContainer}><code style={code}>{validationCode}</code></Section>

        <Section style={btnContainer}>
          <Button style={button} href={loginLink} target="_blank">
            Login
          </Button>
        </Section>

        <Text style={paragraph}>
          Best regards,
          <br />
          <strong>The Developer Team</strong>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>© 2025 E-commerce. All rights reserved.</Text>
      </Container>
    </Body>
  </Html>
);

TwoFactorEmail.PreviewProps = {
  loginLink: "https://example.com/auth/login",
} as TwoFactorEmailProps;

export default TwoFactorEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const code = {
  fontSize: "16px",
  lineHeight: "26px",
};

const codeContainer = {
  padding: "10px",
  width: "50%",
  margin: "0 auto 15px auto",
  backgroundColor: "#f9f9f9",
  textAlign: "center" as const,
}

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#7f22fe",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
