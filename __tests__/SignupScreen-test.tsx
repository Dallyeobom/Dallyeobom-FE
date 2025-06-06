import SignUpScreen from '@/app/signup';
import { useAuthStore } from '@/stores/auth-store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

describe('회원가입 테스트', () => {
  test('닉네임 없이 회원가입 버튼 클릭 시 alert 호출', () => {
    const alertMock = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByText } = render(<SignUpScreen />);
    const signUpButton = getByText('회원가입');

    fireEvent.press(signUpButton);

    expect(alertMock).toHaveBeenCalledWith('error', '닉네임을 입력해주세요');

    alertMock.mockClear();
  });

  test('회원가입시 성공한 경우', async () => {
    const store = useAuthStore.getState();
    const mockSignup = jest.spyOn(store, 'signup');

    const alertMock2 = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<SignUpScreen />);

    const input = screen.getByTestId('signup');
    const button = screen.getByText('회원가입');
    fireEvent.changeText(input, 'user10');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledTimes(1);
      expect(mockSignup).toHaveBeenCalledWith('user10');

      expect(alertMock2).toHaveBeenCalledWith('success', '회원가입에 성공하였습니다', [
        { onPress: expect.any(Function), text: 'OK' },
      ]);
    });
  });
});
