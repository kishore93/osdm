package com.zoomable.map.api.util;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class Util {

	public static boolean isNullOrEmptyorAll(String value) {
		if(value == null || "".equals(value) || "ALL".equals(value)) {
			return false;
		}
		return true;
	}
	
	public static Query addBooleanCriteria(boolean excessQty30Days, boolean excessQty60Days, boolean excessQty90Days,
			boolean excessValue30Days, boolean excessValue60Days, boolean excessValue90Days, boolean obsoleteQty,
			boolean obsoleteValue) {
		
		Query query = new Query();
						
		if(excessQty30Days) { query.addCriteria(Criteria.where("ExcessQty30Days").gt(0)); }
		if(excessQty60Days) { query.addCriteria(Criteria.where("ExcessQty60Days").gt(0)); }
		if(excessQty90Days) { query.addCriteria(Criteria.where("ExcessQty90Days").gt(0)); }
				
		if(excessValue30Days) {	query.addCriteria(Criteria.where("ExcessValue30Days").gt(0)); }
		if(excessValue60Days) {	query.addCriteria(Criteria.where("ExcessValue60Days").gt(0)); }
		if(excessValue90Days) {	query.addCriteria(Criteria.where("ExcessValue90Days").gt(0)); }
		
		if(obsoleteQty) { query.addCriteria(Criteria.where("ObsoleteQty").gt(0)); }
				
		if(obsoleteValue) {	query.addCriteria(Criteria.where("ObsoleteValue").gt(0)); }
				
		return query;
	}
	
}
