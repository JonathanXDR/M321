import { Link, Text } from '@primer/react';
import { useAuthContext } from '../../contexts/auth.context';

const PasswordRequirementsText = () => {
  const { validations, getMutedStyle, getValidationStyle } = useAuthContext();

  return (
    <Text
      sx={{
        color: 'fg.muted',
        fontSize: '12px',
      }}
    >
      <Text as="p">
        Make sure it's{' '}
        <Text
          sx={{
            ...getValidationStyle(validations.passwordRegexTwo),
            ...getMutedStyle(validations.passwordRegexOne),
          }}
        >
          at least 15 characters
        </Text>{' '}
        OR{' '}
        <Text
          sx={{
            ...getValidationStyle(validations.has8chars),
            ...getMutedStyle(validations.passwordRegexTwo),
          }}
        >
          at least 8 characters
        </Text>{' '}
        <Text
          sx={{
            ...getValidationStyle(validations.hasNumber),
            ...getMutedStyle(validations.passwordRegexTwo),
          }}
        >
          including a number
        </Text>{' '}
        <Text
          sx={{
            ...getValidationStyle(validations.hasLowercase),
            ...getMutedStyle(validations.passwordRegexTwo),
          }}
        >
          and a lowercase letter
        </Text>
        .{' '}
        <Link href="https://docs.github.com/articles/creating-a-strong-password">
          Learn more
        </Link>
        .
      </Text>
    </Text>
  );
};

export default PasswordRequirementsText;
