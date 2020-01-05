package pl.com.dropDrive.enums;

public enum ReportStatusEnum {
    OTWARTE("OTWARTE"),
    ZAMKNIETE("ZAMKNIETE"),
    W_TRAKCIE_REALIZACJI("W_TRAKCIE_REALIZACJI");

    private String name;

    ReportStatusEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
