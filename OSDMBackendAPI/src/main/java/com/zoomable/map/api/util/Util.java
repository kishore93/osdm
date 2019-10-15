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
		
		Criteria globalCriteria = new Criteria();
		
		//Excess quantity related
		Criteria excessQtyCriteria = new Criteria();
		
		Criteria excessQty30 = new Criteria();
		Criteria excessQty60 = new Criteria();
		Criteria excessQty90 = new Criteria();
		
		if(excessQty30Days) { excessQty30 = Criteria.where("ExcessQty30Days").gt(0); }
		if(excessQty60Days) { excessQty60 = Criteria.where("ExcessQty60Days").gt(0); }
		if(excessQty90Days) { excessQty90 = Criteria.where("ExcessQty90Days").gt(0); }
		
		excessQtyCriteria.orOperator(excessQty30,excessQty60,excessQty90);
		
		//Excess value related
		Criteria excessValueCriteria = new Criteria();
		
		Criteria excessValue30 = new Criteria();
		Criteria excessValue60 = new Criteria();
		Criteria excessValue90 = new Criteria();
		
		if(excessValue30Days) {	excessValue30 = Criteria.where("ExcessValue30Days").gt(0); }
		if(excessValue60Days) {	excessValue60 = Criteria.where("ExcessValue60Days").gt(0); }
		if(excessValue90Days) {	excessValue90 = Criteria.where("ExcessValue90Days").gt(0); }
		
		excessValueCriteria.orOperator(excessValue30,excessValue60,excessValue90);
		
		//Obsolete quantity related
		Criteria obsoleteQtyCriteria = new Criteria();
		
		if(obsoleteQty) { obsoleteQtyCriteria = Criteria.where("ObsoleteQty").gt(0); }
		
		//Obsolete value related
		Criteria obsoleteValueCriteria = new Criteria();
		
		if(obsoleteValue) {	obsoleteValueCriteria = Criteria.where("ObsoleteValue").gt(0); }
		
		globalCriteria.andOperator(excessQtyCriteria, excessValueCriteria, obsoleteQtyCriteria, obsoleteValueCriteria);
		
		query.addCriteria(globalCriteria);
		
		return query;
	}
	
}
