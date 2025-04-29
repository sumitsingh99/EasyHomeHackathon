package com.payment.reminder.dto;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto<T> {
    private String message;
    private T data;
}
