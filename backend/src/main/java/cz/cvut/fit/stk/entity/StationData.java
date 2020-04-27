package cz.cvut.fit.stk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "seznam_stk")
public class StationData {

    @Id
    @Column(name = "stk_id")
    private Long stationId;

    @Column(name = "rozsah_opravneni")
    private String scopeOfApproval;

    @Column(name = "psc")
    private String postalCode;

    @Column(name = "mesto")
    private String city;

    @Column(name = "ulice")
    private String street;

    @Column(name = "provozovatel")
    private String operator;

    @Column(name = "tel")
    private String telephoneNumber;

    @Column(name = "mail")
    private String email;

    @Column(name = "orp")
    private String community;

    @Column(name = "okres")
    private String district;

    @Column(name = "kraj")
    private String region;

    @Column(name = "cenastk")
    private Long inspectionPrice;

    @Column(name = "cenaevkont")
    private Long evInspectionPrice;

    @Column(name = "cenaemiseb")
    private Long emissionPriceB;

    @Column(name = "cenaemisen")
    private Long emissionPriceN;

    @Column(name = "pracovnidoba")
    private String workingHours;


    public StationData() {
    }

    public Long getStationId() {
        return stationId;
    }

    public void setStationId(Long stationId) {
        this.stationId = stationId;
    }

    public String getScopeOfApproval() {
        return scopeOfApproval;
    }

    public void setScopeOfApproval(String scopeOfApproval) {
        this.scopeOfApproval = scopeOfApproval;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCommunity() {
        return community;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Long getInspectionPrice() {
        return inspectionPrice;
    }

    public void setInspectionPrice(Long inspectionPrice) {
        this.inspectionPrice = inspectionPrice;
    }

    public Long getEvInspectionPrice() {
        return evInspectionPrice;
    }

    public void setEvInspectionPrice(Long regInspectionPrice) {
        this.evInspectionPrice = regInspectionPrice;
    }

    public Long getEmissionPriceB() {
        return emissionPriceB;
    }

    public void setEmissionPriceB(Long emissionPriceB) {
        this.emissionPriceB = emissionPriceB;
    }

    public Long getEmissionPriceN() {
        return emissionPriceN;
    }

    public void setEmissionPriceN(Long emissionPriceN) {
        this.emissionPriceN = emissionPriceN;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationData that = (StationData) o;
        return stationId.equals(that.stationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(stationId);
    }

    @Override
    public String toString() {
        return "StationData{" +
                "stk_id=" + stationId +
                ", rozsah_opravneni='" + scopeOfApproval + '\'' +
                ", psc='" + postalCode + '\'' +
                ", mesto='" + city + '\'' +
                ", ulice='" + street + '\'' +
                ", provozovatel='" + operator + '\'' +
                ", tel='" + telephoneNumber + '\'' +
                ", mail='" + email + '\'' +
                ", orp='" + community + '\'' +
                ", okres='" + district + '\'' +
                ", kraj='" + region + '\'' +
                '}';
    }
}
