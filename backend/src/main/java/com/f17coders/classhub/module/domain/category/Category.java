package com.f17coders.classhub.module.domain.category;

import com.f17coders.classhub.module.domain.lecture.Lecture;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(length = 40)
    private String categoryName;
}
