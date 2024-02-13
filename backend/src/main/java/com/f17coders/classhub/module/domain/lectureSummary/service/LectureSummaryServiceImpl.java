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
		String createQuery =
			"insert into lecture_summary (lecture_id, combined_rating, combined_rating_count, lecture_like_count, site_student_count, weight)\n"
				+ "SELECT a.*, cast(a.site_student_count*0.4 + a.combined_rating*0.35 + a.lecture_like_count*0.15 + a.combined_rating_count*0.1 as float) weight\n"
				+ "\tfrom\n"
				+ "\t\t(select l.lecture_id,\n"
				+ "\t\t     case when l.review_count=0 and l.site_review_count=0 then 0\n"
				+ "\t\t          when l.review_count<10 then round( (l.review_sum*0.2+l.site_review_rating * l.site_review_count*0.8)/(l.review_count*0.2+l.site_review_count*0.8),1 )\n"
				+ "\t\t          else ROUND((l.review_sum * 0.5 + l.site_review_rating * site_review_count * 0.5) / (l.review_count * 0.5 + l.site_review_count * 0.5), 1) END combined_rating,\n"
				+ "\t\t      (l.review_count+l.site_review_count) combined_rating_count,\n"
				+ "\t\t      coalesce(ll.lecture_like_count, 0) lecture_like_count,\n"
				+ "\t\t      l.site_student_count\n"
				+ "\t\t  from lecture l\n"
				+ "\t\t\t  left join (\n"
				+ "\t\t\t      select lecture_id, count(lecture_id) lecture_like_count\n"
				+ "\t\t\t      from lecture_like\n"
				+ "\t\t\t      group by (lecture_id)\n"
				+ "\t\t\t  ) ll\n"
				+ "\t\t\t  ON l.lecture_id=ll.lecture_id) a\n"
				+ "  order by 1;";
		Query query = em.createNativeQuery(createQuery);
		query.executeUpdate();

		em.clear();
	}
}
