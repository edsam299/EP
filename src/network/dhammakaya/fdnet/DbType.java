/**
 * DbType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class DbType implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected DbType(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _AnsiString = "AnsiString";
    public static final java.lang.String _Binary = "Binary";
    public static final java.lang.String _Byte = "Byte";
    public static final java.lang.String _Boolean = "Boolean";
    public static final java.lang.String _Currency = "Currency";
    public static final java.lang.String _Date = "Date";
    public static final java.lang.String _DateTime = "DateTime";
    public static final java.lang.String _Decimal = "Decimal";
    public static final java.lang.String _Double = "Double";
    public static final java.lang.String _Guid = "Guid";
    public static final java.lang.String _Int16 = "Int16";
    public static final java.lang.String _Int32 = "Int32";
    public static final java.lang.String _Int64 = "Int64";
    public static final java.lang.String _Object = "Object";
    public static final java.lang.String _SByte = "SByte";
    public static final java.lang.String _Single = "Single";
    public static final java.lang.String _String = "String";
    public static final java.lang.String _Time = "Time";
    public static final java.lang.String _UInt16 = "UInt16";
    public static final java.lang.String _UInt32 = "UInt32";
    public static final java.lang.String _UInt64 = "UInt64";
    public static final java.lang.String _VarNumeric = "VarNumeric";
    public static final java.lang.String _AnsiStringFixedLength = "AnsiStringFixedLength";
    public static final java.lang.String _StringFixedLength = "StringFixedLength";
    public static final java.lang.String _Xml = "Xml";
    public static final java.lang.String _DateTime2 = "DateTime2";
    public static final java.lang.String _DateTimeOffset = "DateTimeOffset";
    public static final DbType AnsiString = new DbType(_AnsiString);
    public static final DbType Binary = new DbType(_Binary);
    public static final DbType Byte = new DbType(_Byte);
    public static final DbType Boolean = new DbType(_Boolean);
    public static final DbType Currency = new DbType(_Currency);
    public static final DbType Date = new DbType(_Date);
    public static final DbType DateTime = new DbType(_DateTime);
    public static final DbType Decimal = new DbType(_Decimal);
    public static final DbType Double = new DbType(_Double);
    public static final DbType Guid = new DbType(_Guid);
    public static final DbType Int16 = new DbType(_Int16);
    public static final DbType Int32 = new DbType(_Int32);
    public static final DbType Int64 = new DbType(_Int64);
    public static final DbType Object = new DbType(_Object);
    public static final DbType SByte = new DbType(_SByte);
    public static final DbType Single = new DbType(_Single);
    public static final DbType String = new DbType(_String);
    public static final DbType Time = new DbType(_Time);
    public static final DbType UInt16 = new DbType(_UInt16);
    public static final DbType UInt32 = new DbType(_UInt32);
    public static final DbType UInt64 = new DbType(_UInt64);
    public static final DbType VarNumeric = new DbType(_VarNumeric);
    public static final DbType AnsiStringFixedLength = new DbType(_AnsiStringFixedLength);
    public static final DbType StringFixedLength = new DbType(_StringFixedLength);
    public static final DbType Xml = new DbType(_Xml);
    public static final DbType DateTime2 = new DbType(_DateTime2);
    public static final DbType DateTimeOffset = new DbType(_DateTimeOffset);
    public java.lang.String getValue() { return _value_;}
    public static DbType fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        DbType enumeration = (DbType)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static DbType fromString(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        return fromValue(value);
    }
    public boolean equals(java.lang.Object obj) {return (obj == this);}
    public int hashCode() { return toString().hashCode();}
    public java.lang.String toString() { return _value_;}
    public java.lang.Object readResolve() throws java.io.ObjectStreamException { return fromValue(_value_);}
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumSerializer(
            _javaType, _xmlType);
    }
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumDeserializer(
            _javaType, _xmlType);
    }
    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DbType.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DbType"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
