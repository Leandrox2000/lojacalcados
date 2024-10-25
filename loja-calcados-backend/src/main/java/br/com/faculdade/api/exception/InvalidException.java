package br.com.faculdade.api.exception;

public class InvalidException extends RuntimeException {

    public InvalidException(String message) {
        super(message);
    }
}