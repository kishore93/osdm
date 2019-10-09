package com.zoomable.map.api.util;

public class Util {

	public static boolean isNullOrEmptyorAll(String value) {
		if(value == null || "".equals(value) || "ALL".equals(value)) {
			return false;
		}
		return true;
	}
	
}
