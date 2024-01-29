package com.f17coders.classhub.module.domain.studyTag;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class StudyTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_tag_id")
    private int studyTagId;

    // StudyMember - Study 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    // StudyTag - Tag 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public void putStudy(Study study) {
        if (this.study != null) {
            this.study.getStudyTagList().remove(this);
        }
        this.study = study;
        study.getStudyTagList().add(this);
    }

    public static StudyTag createStudyTag(Tag tag) {
        StudyTag studyTag = new StudyTag();

        studyTag.setTag(tag);

        return studyTag;
    }

}