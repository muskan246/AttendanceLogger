package io.robomq.ProjectAL;

public class AbsenceData {

    private String status;

    private String punchIn;

    public String getPunchIn() {
        return punchIn;
    }

    public void setPunchIn(String punchIn) {
        this.punchIn = punchIn;
    }

    public String getPunchOut() {
        return punchOut;
    }

    public void setPunchOut(String punchOut) {
        this.punchOut = punchOut;
    }

    private String punchOut;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "AbsenceData{" +
                "status='" + status + '\'' +
                ", punchIn='" + punchIn + '\'' +
                ", punchOut='" + punchOut + '\'' +
                '}';
    }
}
