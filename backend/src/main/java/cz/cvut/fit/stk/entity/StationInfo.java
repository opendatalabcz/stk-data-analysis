package cz.cvut.fit.stk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "stk_info")
public class StationInfo {

    @Id
    @Column(name = "nazev")
    private String stationName;

    @Column(name = "cenastk")
    private Long inspectionPrice;

    @Column(name = "cenaevkont")
    private Long regInspectionPrice;

    @Column(name = "cenaemiseb")
    private Long emissionPriceB;

    @Column(name = "cenaemisen")
    private Long emissionPriceN;

    @Column(name = "mesta")
    private String city;

    @Column(name = "addr")
    private String address;

    @Column(name = "pracovnidoba")
    private String workingHours;

    @Column(name = "po")
    private String monday;

    @Column(name = "ut")
    private String tuesday;

    @Column(name = "st")
    private String wednesday;

    @Column(name = "ct")
    private String thursday;

    @Column(name = "pa")
    private String friday;

    @Column(name = "so")
    private String saturday;

    @Column(name = "ne")
    private String sunday;

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String nazev) {
        this.stationName = nazev;
    }

    public Long getInspectionPrice() {
        return inspectionPrice;
    }

    public void setInspectionPrice(Long cenastk) {
        this.inspectionPrice = cenastk;
    }

    public Long getRegInspectionPrice() {
        return regInspectionPrice;
    }

    public void setRegInspectionPrice(Long cenaevkont) {
        this.regInspectionPrice = cenaevkont;
    }

    public Long getEmissionPriceB() {
        return emissionPriceB;
    }

    public void setEmissionPriceB(Long cenaemiseb) {
        this.emissionPriceB = cenaemiseb;
    }

    public Long getEmissionPriceN() {
        return emissionPriceN;
    }

    public void setEmissionPriceN(Long cenaemisen) {
        this.emissionPriceN = cenaemisen;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String mesta) {
        this.city = mesta;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String addr) {
        this.address = addr;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String pracovnidoba) {
        this.workingHours = pracovnidoba;
    }

    public String getMonday() {
        return monday;
    }

    public void setMonday(String po) {
        this.monday = po;
    }

    public String getTuesday() {
        return tuesday;
    }

    public void setTuesday(String ut) {
        this.tuesday = ut;
    }

    public String getWednesday() {
        return wednesday;
    }

    public void setWednesday(String st) {
        this.wednesday = st;
    }

    public String getThursday() {
        return thursday;
    }

    public void setThursday(String ct) {
        this.thursday = ct;
    }

    public String getFriday() {
        return friday;
    }

    public void setFriday(String pa) {
        this.friday = pa;
    }

    public String getSaturday() {
        return saturday;
    }

    public void setSaturday(String so) {
        this.saturday = so;
    }

    public String getSunday() {
        return sunday;
    }

    public void setSunday(String ne) {
        this.sunday = ne;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationInfo that = (StationInfo) o;
        return stationName.equals(that.stationName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(stationName);
    }

    @Override
    public String toString() {
        return "StationInfo{" +
                "nazev='" + stationName + '\'' +
                ", cenastk=" + inspectionPrice +
                ", cenaevkont=" + regInspectionPrice +
                ", cenaemiseb=" + emissionPriceB +
                ", cenaemisen=" + emissionPriceN +
                ", mesta='" + city + '\'' +
                ", addr='" + address + '\'' +
                ", pracovnidoba='" + workingHours + '\'' +
                ", po='" + monday + '\'' +
                ", ut='" + tuesday + '\'' +
                ", st='" + wednesday + '\'' +
                ", ct='" + thursday + '\'' +
                ", pa='" + friday + '\'' +
                ", so='" + saturday + '\'' +
                ", ne='" + sunday + '\'' +
                '}';
    }
}
