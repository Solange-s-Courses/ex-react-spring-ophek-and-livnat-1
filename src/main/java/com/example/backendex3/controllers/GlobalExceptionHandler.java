package com.example.backendex3.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;


/**
 * Global exception handler for the application.
 * Captures and processes common exceptions thrown by controllers and services,
 * returning appropriate HTTP responses and error messages.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation exceptions thrown when request body validation fails.
     *
     * @param ex the exception containing validation error details
     * @return a map where each key is a field name and value is the corresponding validation error message
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex)
    {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    /**
     * Handles illegal argument exceptions (e.g., invalid inputs that violate business logic).
     *
     * @param e the thrown IllegalArgumentException
     * @return HTTP 400 response with the exception message
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    /**
     * Handles exceptions of type {@link ResponseStatusException} and uses its status and reason in the response.
     *
     * @param ex the thrown ResponseStatusException
     * @return HTTP response with the status code and reason provided by the exception
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleStatusException(ResponseStatusException ex) {
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(ex.getReason());
    }


    /**
     * Handles runtime exceptions with special treatment for repository-related errors (e.g., file I/O issues).
     *
     * @param e the thrown RuntimeException
     * @return HTTP 500 response with a specific message for repository errors or a generic message for others
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        // Check if this is a repository-related error
        if (e.getMessage() != null &&
                (e.getMessage().contains("file") ||
                        e.getMessage().contains("save") ||
                        e.getMessage().contains("load") ||
                        e.getMessage().contains("deserializ"))) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }

        // Handle other runtime exceptions as general server errors
        return ResponseEntity.internalServerError().body("Server error: " + e.getMessage());
    }

    /**
     * Handles all uncaught exceptions not explicitly handled by other methods.
     *
     * @param e the thrown Exception
     * @return HTTP 500 response with a generic error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception e) {
        return ResponseEntity.internalServerError().body("Internal server error, try again later");
    }

}