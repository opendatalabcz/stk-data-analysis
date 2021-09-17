package cz.cvut.fit.stk.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "logs")
public class Log {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "timestamp")
    private Timestamp timestamp;

    @Column(name = "vin")
    private String VIN;

    public Log() {
    }

    @Column(name = "id")
    public Long getLogsId() {return id; }
    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "timestamp")
    public Timestamp getTimestamp() {return timestamp; }
    public void setLogsTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Column(name = "vin")
    public String getLogsVIN() { return VIN; }
    public void setLogsVIN(String vin) {
        this.VIN = vin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Log that = (Log) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Logs{" +
                "id=" + id +
                ", timestamp=" + timestamp + '\'' +
                ", vin='" + VIN + '\'' +
                '}';
    }


}

