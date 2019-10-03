package com.zoomable.map.api.util;

public class Util {

	public static boolean isNullOrEmpty(String value) {
		if(value == null || "".equals(value)) {
			return true;
		}
		return false;
	}
	
}
