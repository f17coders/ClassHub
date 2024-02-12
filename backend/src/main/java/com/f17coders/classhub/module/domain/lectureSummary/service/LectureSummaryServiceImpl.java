package com.f17coders.classhub.module.domain.lectureSummary.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class LectureSummaryServiceImpl implements LectureSummaryService {
    @Autowired
    private final EntityManager em;

    @Override
    public void dropLectureSummaryTable() {
        String dropQuery = "delete from lecture_summary where 1=1;";
        Query query = em.createNativeQuery(dropQuery);
        query.executeUpdate();

        em.clear();
    }

    @Override
    public void createLectureSummaryTable() {
        String dropQuery = "insert into lecture_summary (lecture_id, combined_rating, combined_rating_count, lecture_like_count)\n" +
                "select l.lecture_id,\n" +
                "       case when l.review_count=0 and l.site_review_count=0 then 0\n" +
                "            when l.review_count<10 then round( (l.review_sum*0.2+l.site_review_rating * l.site_review_count*0.8)/(l.review_count*0.2+l.site_review_count*0.8),1 )\n" +
                "            else ROUND((l.review_sum * 0.5 + l.site_review_rating * site_review_count * 0.5) / (l.review_count * 0.5 + l.site_review_count * 0.5), 1) END combined_rating,\n" +
                "        (l.review_count+l.site_review_count) combined_rating_count,\n" +
                "        coalesce(ll.lecture_like_count, 0) lecture_like_count\n" +
                "    from lecture l\n" +
                "    left join (\n" +
                "        select lecture_id, count(lecture_id) lecture_like_count\n" +
                "        from lecture_like\n" +
                "        group by (lecture_id)\n" +
                "    ) ll\n" +
                "    on l.lecture_id=ll.lecture_id\n" +
                "    order by 1;";
        Query query = em.createNativeQuery(dropQuery);
        query.executeUpdate();

        em.clear();
    }
}
