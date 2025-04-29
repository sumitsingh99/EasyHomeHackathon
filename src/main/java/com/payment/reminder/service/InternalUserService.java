package com.payment.reminder.service;

import com.payment.reminder.dao.InternalUserRepository;
import com.payment.reminder.dto.ResponseDto;
import org.springframework.stereotype.Service;


@Service
public class InternalUserService {
    private final InternalUserRepository internalUserRepository;

    public InternalUserService(InternalUserRepository internalUserRepository) {
        this.internalUserRepository = internalUserRepository;
    }

    public ResponseDto<?> login(String userName, String password) {

        ResponseDto<String> response = new ResponseDto<>();
        internalUserRepository.findByUserName(userName).ifPresentOrElse(
                internalUser -> {
                    if (internalUser.getPassword().equals(password)) {
                        response.setMessage("Login successful");
                        response.setData("Login successful");
                    } else {
                        response.setMessage("Invalid password");
                        response.setData("Invalid password");
                    }
                },
                () -> {
                    response.setMessage("User not found");
                    response.setData("User not found");
                }
        );
        return response;
    }

    public ResponseDto<?> logout(String userName) {
        ResponseDto<String> response = new ResponseDto<>();
        internalUserRepository.findByUserName(userName).ifPresentOrElse(
                internalUser -> {
                    response.setMessage("Logout successful");
                    response.setData("Logout successful");
                },
                () -> {
                    response.setMessage("User not found");
                    response.setData("User not found");
                }
        );
        return response;
    }

    public ResponseDto<?> forgetPassword(String userName, String newPassword) {
        ResponseDto<String> response = new ResponseDto<>();
        internalUserRepository.findByUserName(userName).ifPresentOrElse(
                internalUser -> {
                    internalUser.setPassword(newPassword);
                    internalUserRepository.save(internalUser);
                    response.setMessage("Password updated successfully");
                    response.setData("Password updated successfully");
                },
                () -> {
                    response.setMessage("User not found");
                    response.setData("User not found");
                }
        );
        return response;
    }
}
