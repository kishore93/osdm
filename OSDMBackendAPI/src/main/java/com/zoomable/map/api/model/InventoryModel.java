package com.zoomable.map.api.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Inventory")
public class InventoryModel {

	@Field(value = "Region")
	private String region;

	@Field(value = "State")
	private String state;

	@Field(value = "PlantCode")
	private String plantCode;

	@Field(value = "MaterialNo")
	private String materialNo;

	@Field(value = "MaterialDescription")
	private String materialDescription;

	@Field(value = "Quantitypcs")
	private double quantityPcs;

	@Field(value = "Price/Unit")
	private double pricePerUnit;

	@Field(value = "value")
	private double value;

	@Field(value = "Demand30Days")
	private double demandFor30Days;

	@Field(value = "Demand60Days")
	private double demandFor60Days;

	@Field(value = "Demand90Days")
	private double demandFor90Days;

	@Field(value = "AnnualDemand")
	private double annualDemand;

	@Field(value = "ExcessQty30Days")
	private double excessQuantityFor30Days;

	@Field(value = "ExcessQty60Days")
	private double excessQuantityFor60Days;

	@Field(value = "ExcessQty90Days")
	private double excessQuantityFor90Days;

	@Field(value = "ExcessValue30Days")
	private double excessValueFor30Days;

	@Field(value = "ExcessValue60Days")
	private double excessValueFor60Days;

	@Field(value = "ExcessValue90Days")
	private double excessValueFor90Days;

	@Field(value = "ObsoleteQty")
	private double obsoleteQty;

	@Field(value = "ObsoleteValue")
	private double obsoleteValue;

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPlantCode() {
		return plantCode;
	}

	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}

	public String getMaterialNo() {
		return materialNo;
	}

	public void setMaterialNo(String materialNo) {
		this.materialNo = materialNo;
	}

	public String getMaterialDescription() {
		return materialDescription;
	}

	public void setMaterialDescription(String materialDescription) {
		this.materialDescription = materialDescription;
	}

	public double getQuantityPcs() {
		return quantityPcs;
	}

	public void setQuantityPcs(double quantityPcs) {
		this.quantityPcs = quantityPcs;
	}

	public double getPricePerUnit() {
		return pricePerUnit;
	}

	public void setPricePerUnit(double pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public double getDemandFor30Days() {
		return demandFor30Days;
	}

	public void setDemandFor30Days(double demandFor30Days) {
		this.demandFor30Days = demandFor30Days;
	}

	public double getDemandFor60Days() {
		return demandFor60Days;
	}

	public void setDemandFor60Days(double demandFor60Days) {
		this.demandFor60Days = demandFor60Days;
	}

	public double getDemandFor90Days() {
		return demandFor90Days;
	}

	public void setDemandFor90Days(double demandFor90Days) {
		this.demandFor90Days = demandFor90Days;
	}

	public double getAnnualDemand() {
		return annualDemand;
	}

	public void setAnnualDemand(double annualDemand) {
		this.annualDemand = annualDemand;
	}

	public double getExcessQuantityFor30Days() {
		return excessQuantityFor30Days;
	}

	public void setExcessQuantityFor30Days(double excessQuantityFor30Days) {
		this.excessQuantityFor30Days = excessQuantityFor30Days;
	}

	public double getExcessQuantityFor60Days() {
		return excessQuantityFor60Days;
	}

	public void setExcessQuantityFor60Days(double excessQuantityFor60Days) {
		this.excessQuantityFor60Days = excessQuantityFor60Days;
	}

	public double getExcessQuantityFor90Days() {
		return excessQuantityFor90Days;
	}

	public void setExcessQuantityFor90Days(double excessQuantityFor90Days) {
		this.excessQuantityFor90Days = excessQuantityFor90Days;
	}

	public double getExcessValueFor30Days() {
		return excessValueFor30Days;
	}

	public void setExcessValueFor30Days(double excessValueFor30Days) {
		this.excessValueFor30Days = excessValueFor30Days;
	}

	public double getExcessValueFor60Days() {
		return excessValueFor60Days;
	}

	public void setExcessValueFor60Days(double excessValueFor60Days) {
		this.excessValueFor60Days = excessValueFor60Days;
	}

	public double getExcessValueFor90Days() {
		return excessValueFor90Days;
	}

	public void setExcessValueFor90Days(double excessValueFor90Days) {
		this.excessValueFor90Days = excessValueFor90Days;
	}

	public double getObsoleteQty() {
		return obsoleteQty;
	}

	public void setObsoleteQty(double obsoleteQty) {
		this.obsoleteQty = obsoleteQty;
	}

	public double getObsoleteValue() {
		return obsoleteValue;
	}

	public void setObsoleteValue(double obsoleteValue) {
		this.obsoleteValue = obsoleteValue;
	}
	
}
