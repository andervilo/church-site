package com.church.contact;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ContactMessageCreatedEvent extends ApplicationEvent {

    private final ContactMessage message;

    public ContactMessageCreatedEvent(Object source, ContactMessage message) {
        super(source);
        this.message = message;
    }
}
